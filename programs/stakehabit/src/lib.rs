use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use instructions::*;

declare_id!("BiNHU6WREw9goaqhSS842Ls667rwgzTodueRXVssDrkx");

#[program]
pub mod stakehabit {
    use super::*;

    pub fn create_goal(
        ctx: Context<CreateGoal>,
        title: String,
        duration_days: u8,
        stake_lamports: u64,
    ) -> Result<()> {
        instructions::create_goal::create_goal(ctx, title, duration_days, stake_lamports)
    }

    pub fn check_in(ctx: Context<CheckIn>) -> Result<()> {
        instructions::check_in::check_in(ctx)
    }

    pub fn settle(ctx: Context<Settle>) -> Result<()> {
        instructions::settle::settle(ctx)
    }
}
