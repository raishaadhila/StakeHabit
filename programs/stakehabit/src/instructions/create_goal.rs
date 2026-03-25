use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::errors::StakeHabitError;

#[derive(Accounts)]
#[instruction(title: String, duration_days: u8)]
pub struct CreateGoal<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        space = Goal::SPACE,
        seeds = [b"goal", owner.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub goal: Account<'info, Goal>,

    #[account(
        init,
        payer = owner,
        space = StakeEscrow::SPACE,
        seeds = [b"escrow", goal.key().as_ref()],
        bump
    )]
    pub escrow: Account<'info, StakeEscrow>,

    #[account(
        init,
        payer = owner,
        space = Progress::SPACE,
        seeds = [b"progress", goal.key().as_ref()],
        bump
    )]
    pub progress: Account<'info, Progress>,

    pub system_program: Program<'info, System>,
}

pub fn create_goal(
    ctx: Context<CreateGoal>,
    title: String,
    duration_days: u8,
    stake_lamports: u64,
) -> Result<()> {
    require!(
        duration_days == 7 || duration_days == 14 || duration_days == 30,
        StakeHabitError::InvalidDuration
    );
    require!(
        stake_lamports >= StakeEscrow::MIN_STAKE_LAMPORTS,
        StakeHabitError::StakeTooLow
    );

    let now = Clock::get()?.unix_timestamp;

    let goal = &mut ctx.accounts.goal;
    goal.owner = ctx.accounts.owner.key();
    goal.title = title;
    goal.duration_days = duration_days;
    goal.start_ts = now;
    goal.end_ts = now + (duration_days as i64 * 86400);
    goal.is_active = true;
    goal.is_settled = false;
    goal.bump = ctx.bumps.goal;

    let escrow = &mut ctx.accounts.escrow;
    escrow.owner = ctx.accounts.owner.key();
    escrow.goal = goal.key();
    escrow.amount_lamports = stake_lamports;
    escrow.bump = ctx.bumps.escrow;

    let progress = &mut ctx.accounts.progress;
    progress.owner = ctx.accounts.owner.key();
    progress.goal = goal.key();
    progress.total_days = duration_days;
    progress.completed_days = 0;
    progress.last_checkin_ts = 0;
    progress.streak = 0;
    progress.bump = ctx.bumps.progress;

    // Transfer stake into escrow PDA
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.owner.to_account_info(),
                to: ctx.accounts.escrow.to_account_info(),
            },
        ),
        stake_lamports,
    )?;

    Ok(())
}
