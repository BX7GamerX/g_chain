use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct Comment {
    pub id: u64,
    pub post_id: u64,
    pub author: Principal,
    pub content: String,
    pub created_at: u64,
}
