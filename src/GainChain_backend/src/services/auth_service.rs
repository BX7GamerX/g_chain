// src/GainChain_backend/services/auth_service.rs
use crate::models::user_model::User;
use bcrypt::{hash, verify};
use uuid::Uuid;

pub fn register_user(username: &str, password: &str, email: &str) -> Result<User, String> {
    let hashed_password = match hash(password, 4) {
        Ok(hash) => hash,
        Err(_) => return Err("Failed to hash password.".to_string()),
    };

    let user = User {
        id: Uuid::new_v4().to_string(),
        username: username.to_string(),
        hashed_password,
        email: email.to_string(),
    };

    Ok(user)
}

pub fn login_user(user: &User, password: &str) -> Result<String, String> {
    if verify(password, &user.hashed_password).unwrap_or(false) {
        Ok("Login successful.".to_string())
    } else {
        Err("Invalid credentials.".to_string())
    }
}
