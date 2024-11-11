// src/GainChain_backend/models/user_model.rs
use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Debug, Clone)]
pub struct User {
    pub id: String,
    pub username: String,
    pub hashed_password: String,
    pub email: String,
}
