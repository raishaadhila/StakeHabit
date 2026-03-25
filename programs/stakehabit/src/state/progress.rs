use anchor_lang::prelude::*;

#[account]
pub struct Progress {
    pub owner: Pubkey,
    pub goal: Pubkey,
    pub total_days: u8,
    pub completed_days: u8,
    pub last_checkin_ts: i64,
    pub streak: u8,
    pub bump: u8,
}

impl Progress {
    pub const SPACE: usize = 8 + 32 + 32 + 1 + 1 + 8 + 1 + 1;

    pub fn missed_days(&self) -> u8 {
        self.total_days.saturating_sub(self.completed_days)
    }

    /// Miss rate as percentage (0–100)
    pub fn miss_rate(&self) -> u8 {
        if self.total_days == 0 {
            return 0;
        }
        (self.missed_days() as u16 * 100 / self.total_days as u16) as u8
    }
}
