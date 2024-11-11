// src/GainChain_backend/services/user_service.rs
use crate::models::user_model::User;
use crate::helpers::storage_helper::{save_to_file, load_from_file};
use uuid::Uuid;

const USER_DATA_FILE: &str = "data/users.json";

pub fn create_user(username: &str, password: &str, email: &str) -> User {
    let user = User {
        id: Uuid::new_v4().to_string(),
        username: username.to_string(),
        password: password.to_string(),
        email: email.to_string(),
    };

    let mut users = load_users();
    users.push(user.clone());
    save_to_file(&users, USER_DATA_FILE).expect("Failed to save user data");

    user
}

pub fn get_user_by_id(id: &str) -> Option<User> {
    let users = load_users();
    users.into_iter().find(|user| user.id == id)
}

fn load_users() -> Vec<User> {
    load_from_file(USER_DATA_FILE).unwrap_or_else(|_| vec![])
}
