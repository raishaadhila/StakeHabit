use anchor_lang::prelude::*;

#[account]
pub struct Goal {
    pub owner: Pubkey,
    pub title: String,        // max 64 chars
    pub duration_days: u8,    // 7, 14, or 30
    pub start_ts: i64,
    pub end_ts: i64,
    pub is_active: bool,
    pub is_settled: bool,
    pub bump: u8,
}

impl Goal {
    pub const MAX_TITLE_LEN: usize = 64;
    pub const SPACE: usize = 8 + 32 + (4 + Self::MAX_TITLE_LEN) + 1 + 8 + 8 + 1 + 1 + 1;
}
