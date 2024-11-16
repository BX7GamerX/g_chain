//src/GainChain_backend/src/controllers/user_controller.rs
use ic_cdk::storage;
use serde_json::json;
use crate::models::user_model::UserProfile;
use chrono::Utc;

// Type alias for user storage
type Users = Vec<UserProfile>;

/// Create a new user profile
#[ic_cdk_macros::update]
pub fn create_user(principal_id: String, username: String, email: String) -> String {
    // Initialize or retrieve storage
    let mut users: Users = ic_cdk::storage::get_mut();

    // Timestamp for creation
    let created_at = chrono::Utc::now().to_rfc3339();

    // Check for duplicate users
    if users.iter().any(|user| user.principal_id == principal_id) {
        return format!("User with principal ID {} already exists", principal_id);
    }

    // Create and store new user
    let new_user = UserProfile {
        principal_id: principal_id.clone(),
        username,
        email,
        created_at,
    };

    users.push(new_user);

    format!("User {} created successfully", principal_id)
}


/// Retrieve user profile by principal ID
#[ic_cdk_macros::query]
pub fn get_user(principal_id: String) -> String {
    // Retrieve storage
    let users: Users = ic_cdk::storage::get();

    // Find the user and return as JSON or error message
    match users.iter().find(|user| user.principal_id == principal_id) {
        Some(user) => serde_json::to_string(user).unwrap_or_else(|_| "Failed to serialize user profile".to_string()),
        None => format!("User with principal ID {} not found", principal_id),
    }
}

/// Update user profile
#[ic_cdk_macros::update]
pub fn update_user(principal_id: String, username: Option<String>, email: Option<String>) -> String {
    let mut users: Users = storage::get_mut();

    match users.iter_mut().find(|user| user.principal_id == principal_id) {
        Some(user) => {
            if let Some(new_username) = username {
                user.username = new_username;
            }
            if let Some(new_email) = email {
                user.email = new_email;
            }
            format!("User {} updated successfully", principal_id)
        }
        None => format!("User with principal ID {} not found", principal_id),
    }
}
