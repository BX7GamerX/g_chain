//src/GainChain_backend/src/controllers/user_controller.rs
use std::cell::{RefCell, RefMut};
use serde_json::json;
use crate::models::user_model::User;
use ic_cdk::api::time;

type Users = Vec<User>;
//use std::cell::RefCell;

thread_local! {
    static USERS: RefCell<Vec<User>> = RefCell::new(Vec::new());
}
#[ic_cdk_macros::query]
pub fn get_all_users() -> Vec<User> {
    USERS.with(|users| users.borrow().clone())
}

/*
thread_local! {
    static USERS: RefCell<Users> = RefCell::new(Vec::new());
}
pub fn get_users_mut() -> RefMut<'static, Users> {
    USERS.with(|users| users.borrow_mut())
}*/
/*
pub fn get_users_mut() -> RefMut<'static, Users> {
    USERS.with(|users| users.borrow_mut())
}
*/
/// Create a new user
#[ic_cdk_macros::update]
pub fn create_user(name: String, email: String) -> String {
    let id = format!("user-{}", time());
    let created_at = time().to_string();
    let new_user = User { id: id.clone(), name, email, created_at };

    get_all_users().push(new_user);
    format!("User {} created successfully", id)
}

/// Retrieve user details
#[ic_cdk_macros::query]
pub fn get_user_details(user_id: String) -> String {
    USERS.with(|users| {
        match users.borrow().iter().find(|user| user.id == user_id) {
            Some(user) => serde_json::to_string(user).expect("Failed to serialize user"),
            None => format!("User {} not found", user_id),
        }
    })
}

/// Update user details
#[ic_cdk_macros::update]
pub fn update_user(user_id: String, name: Option<String>, email: Option<String>) -> String {
    USERS.with(|users| {
        match users.borrow_mut().iter_mut().find(|user| user.id == user_id) {
            Some(user) => {
                if let Some(new_name) = name { user.name = new_name; }
                if let Some(new_email) = email { user.email = new_email; }
                format!("User {} updated successfully", user_id)
            }
            None => format!("User {} not found", user_id),
        }
    })
}

/// Delete user
#[ic_cdk_macros::update]
pub fn delete_user(user_id: String) -> String {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if let Some(pos) = users.iter().position(|user| user.id == user_id) {
            users.remove(pos);
            format!("User {} deleted successfully", user_id)
        } else {
            format!("User {} not found", user_id)
        }
    })
}
