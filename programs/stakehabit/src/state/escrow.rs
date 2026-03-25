use anchor_lang::prelude::*;

#[account]
pub struct StakeEscrow {
    pub owner: Pubkey,
    pub goal: Pubkey,
    pub amount_lamports: u64,
    pub bump: u8,
}

impl StakeEscrow {
    pub const SPACE: usize = 8 + 32 + 32 + 8 + 1;
    pub const MIN_STAKE_LAMPORTS: u64 = 100_000_000; // 0.1 SOL
}
