//src/GainChain_backend/src/controllers/user_controller.rs
use std::cell::{RefCell, RefMut};
use serde_json::json;
use crate::models::user_model::{User,USERS, get_all_users};
/*
thread_local! {
    static USERS: RefCell<Vec<User>> = RefCell::new(get_all_users());
}*/
use ic_cdk::api::time;




/// Create a new user
#[ic_cdk_macros::update]
pub fn create_user(name: String, email: String) -> String {
    //let id = format!("user-{}", time());
    let id :String = "123".to_string();
    let created_at = time().to_string();
    let new_user = User { id: id.clone(), name, email, created_at };
    
    //get_all_users().push(new_user);
    USERS.write().unwrap().push(new_user);
    format!("User {} created successfully", id)
}

/// Retrieve user details
#[ic_cdk_macros::query]
pub fn get_user_details(user_id: String) -> String {
    let users = USERS.read().unwrap();
    match users.iter().find(|user| user.id == user_id) {
            Some(user) => serde_json::to_string(user).expect("Failed to serialize user"),
            None => format!("User {} not found", user_id),
        }
    
}


/// Update user details
#[ic_cdk_macros::update]
pub fn update_user(user_id: String, name: Option<String>, email: Option<String>) -> String {
    let mut users = USERS.write().unwrap();
    match users.iter_mut().find(|user| user.id == user_id) {
            Some(user) => {
                if let Some(new_name) = name { user.name = new_name; }
                if let Some(new_email) = email { user.email = new_email; }
                format!("User {} updated successfully", user_id)
            }
            None => format!("User {} not found", user_id),
        }
}

/// Delete user
#[ic_cdk_macros::update]
pub fn delete_user(user_id: String) -> String {
    let mut users = USERS.write().unwrap();
        if let Some(pos) = users.iter().position(|user| user.id == user_id) {
            users.remove(pos);
            format!("User {} deleted successfully", user_id)
        } else {
            format!("User {} not found", user_id)
        }
    }
