//src/GainChain_backend/src/models/user_model.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct UserProfile {
    pub principal_id: String, // Unique identifier for the user
    pub username: String,
    pub email: String,
    pub created_at: String,
}
