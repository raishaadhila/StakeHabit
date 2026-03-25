use anchor_lang::prelude::*;

#[error_code]
pub enum StakeHabitError {
    #[msg("Goal duration must be 7, 14, or 30 days")]
    InvalidDuration,
    #[msg("Stake amount is below minimum")]
    StakeTooLow,
    #[msg("Goal is not active")]
    GoalNotActive,
    #[msg("Already checked in today")]
    AlreadyCheckedIn,
    #[msg("Challenge not yet ended")]
    ChallengeNotEnded,
    #[msg("Unauthorized")]
    Unauthorized,
}
