use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::StakeHabitError;

/// Prize pool treasury — set to a fixed PDA or platform wallet
pub const PRIZE_POOL_SEED: &[u8] = b"prize_pool";

#[derive(Accounts)]
pub struct Settle<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [b"goal", owner.key().as_ref(), goal.title.as_bytes()],
        bump = goal.bump,
        constraint = goal.owner == owner.key() @ StakeHabitError::Unauthorized,
        constraint = goal.is_active @ StakeHabitError::GoalNotActive,
        constraint = !goal.is_settled @ StakeHabitError::GoalNotActive,
    )]
    pub goal: Account<'info, Goal>,

    #[account(
        mut,
        seeds = [b"escrow", goal.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, StakeEscrow>,

    #[account(
        seeds = [b"progress", goal.key().as_ref()],
        bump = progress.bump,
    )]
    pub progress: Account<'info, Progress>,

    /// CHECK: prize pool treasury PDA
    #[account(
        mut,
        seeds = [PRIZE_POOL_SEED],
        bump,
    )]
    pub prize_pool: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn settle(ctx: Context<Settle>) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let goal = &mut ctx.accounts.goal;

    require!(now >= goal.end_ts, StakeHabitError::ChallengeNotEnded);

    let miss_rate = ctx.accounts.progress.miss_rate();
    let stake = ctx.accounts.escrow.amount_lamports;

    // Miss <10% → full refund; else slash proportionally to prize pool
    let refund = if miss_rate < 10 {
        stake
    } else {
        // Refund proportional to completion rate
        let completion = 100u64 - miss_rate as u64;
        stake * completion / 100
    };
    let slash = stake - refund;

    let escrow_key = ctx.accounts.escrow.key();
    let escrow_bump = ctx.accounts.escrow.bump;
    let signer_seeds: &[&[&[u8]]] = &[&[b"escrow", escrow_key.as_ref(), &[escrow_bump]]];

    // Refund owner
    if refund > 0 {
        **ctx.accounts.escrow.to_account_info().try_borrow_mut_lamports()? -= refund;
        **ctx.accounts.owner.to_account_info().try_borrow_mut_lamports()? += refund;
    }

    // Send slash to prize pool
    if slash > 0 {
        **ctx.accounts.escrow.to_account_info().try_borrow_mut_lamports()? -= slash;
        **ctx.accounts.prize_pool.to_account_info().try_borrow_mut_lamports()? += slash;
    }

    let _ = signer_seeds; // used implicitly via PDA constraints

    goal.is_active = false;
    goal.is_settled = true;

    Ok(())
}
