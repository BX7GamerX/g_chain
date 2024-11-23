use serde::{Serialize, Deserialize};
use candid::{CandidType, Decode, Encode};

#[derive(Serialize, Deserialize, CandidType, Clone, Debug, Default)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
    pub created_at: String,
}

impl Project {
    /// Encode project data for storage in stable memory
    pub fn encode(&self) -> Vec<u8> {
        Encode!(self).expect("Failed to encode project data")
    }

    /// Decode project data from stable memory
    pub fn decode(data: &[u8]) -> Self {
        Decode!(data, Project).expect("Failed to decode project data")
    }
}
