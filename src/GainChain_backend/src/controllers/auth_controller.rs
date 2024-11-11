// src/controllers/auth_controller.rs
use crate::services::auth_service;


pub fn login(username: &str, password: &str) -> Result<String, String> {
    auth_service::authenticate_user(username, password)
}
