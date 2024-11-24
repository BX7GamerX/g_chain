//src/GainChain_backend/src/models/canvas_model.rs
use serde::{Deserialize, Serialize};
use candid::CandidType;

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct CanvasElement {
    pub id: String,
    pub element_type: String, // E.g., "component", "connection"
    pub metadata: Option<String>, // Optional metadata like config info
    pub position: Option<(i32, i32)>, // Coordinates for UI representation
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Canvas {
    pub id: String,
    pub elements: Vec<CanvasElement>, // List of elements on the canvas
    pub created_by: String, // User ID
    pub last_modified: String, // ISO8601 timestamp
}
