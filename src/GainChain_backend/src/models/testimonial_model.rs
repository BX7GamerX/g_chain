// src/GainChain_backend/models/testimonial_model.rs
use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Debug, Clone)]
pub struct Testimonial {
    pub id: String,
    pub user_id: String,
    pub content: String,
    pub timestamp: u64,
}
