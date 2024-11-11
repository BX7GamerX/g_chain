// src/GainChain_backend/models/settings_model.rs
use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Debug, Clone)]
pub struct Settings {
    pub user_id: String,
    pub dark_mode: bool,
    pub font_size: u8,
}
