// src/models/user_model.rs
use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub struct User {
    pub username: String,
    pub email: String,
    pub password_hash: String,
}
