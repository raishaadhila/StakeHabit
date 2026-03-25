use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::StakeHabitError;

#[derive(Accounts)]
pub struct CheckIn<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        seeds = [b"goal", owner.key().as_ref(), goal.title.as_bytes()],
        bump = goal.bump,
        constraint = goal.owner == owner.key() @ StakeHabitError::Unauthorized,
        constraint = goal.is_active @ StakeHabitError::GoalNotActive,
    )]
    pub goal: Account<'info, Goal>,

    #[account(
        mut,
        seeds = [b"progress", goal.key().as_ref()],
        bump = progress.bump,
    )]
    pub progress: Account<'info, Progress>,
}

pub fn check_in(ctx: Context<CheckIn>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let progress = &mut ctx.accounts.progress;

    // Prevent double check-in within same day (86400s)
    let seconds_since_last = now - progress.last_checkin_ts;
    require!(seconds_since_last >= 86400, StakeHabitError::AlreadyCheckedIn);

    progress.completed_days += 1;
    progress.last_checkin_ts = now;

    // Update streak: if checked in within 2 days, continue streak
    if seconds_since_last <= 172800 {
        progress.streak += 1;
    } else {
        progress.streak = 1;
    }

    Ok(())
}
