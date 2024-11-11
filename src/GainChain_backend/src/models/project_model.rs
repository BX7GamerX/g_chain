// src/models/project_model.rs
use candid::{CandidType, Deserialize};

#[derive(CandidType, Deserialize, Clone)]
pub struct Project {
    pub id: u32,
    pub name: String,
    pub description: String,
}
