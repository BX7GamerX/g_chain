// src/GainChain_backend/controllers/auth_controller.rs
use crate::services::auth_service::{register_user, login_user};
use crate::models::user_model::User;

pub fn register(username: &str, password: &str, email: &str) -> Result<User, String> {
    register_user(username, password, email)
}

pub fn login(user: &User, password: &str) -> Result<String, String> {
    login_user(user, password)
}
