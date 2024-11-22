//src/GainChain_backend/src/models/user_model.rs
use serde::{Serialize, Deserialize};
use candid::{CandidType, Decode, Encode};

#[derive(Serialize, Deserialize, CandidType, Clone, Debug)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub created_at: String,
}

impl User {
    /// Encode user data for storage in stable memory
    pub fn encode(&self) -> Vec<u8> {
        Encode!(self).expect("Failed to encode user data")
    }

    /// Decode user data from stable memory
    pub fn decode(data: &[u8]) -> Self {
        Decode!(data, User).expect("Failed to decode user data")
    }
}

