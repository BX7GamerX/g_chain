//src/GainChain_backend/src/models/project_model.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
}
