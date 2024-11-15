// src/controllers/auth_controller.rs
use ic_cdk_macros::{query, update};
use serde_json::json;

/// Handles login initiation via Internet Identity.
#[query]
pub fn login() -> String {
    let response = json!({
        "status": "success",
        "message": "Login with Internet Identity initiated",
        "internet_identity_url": "https://identity.ic0.app/#authorize"
    });

    response.to_string()
}

/// Simulates a logout endpoint.
#[update]
pub fn logout() -> String {
    let response = json!({
        "status": "success",
        "message": "User logged out successfully"
    });

    response.to_string()
}

