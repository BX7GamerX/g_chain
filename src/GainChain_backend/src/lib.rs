use std::collections::HashMap;
use candid::{CandidType, Principal};
use models::post;
use serde::{Deserialize, Serialize};  // Import only from serde

// Import models and services modules
mod models;
mod services;

// Re-export methods from services with unique names to avoid conflicts
pub use services::user_service::{create_user as create_user_service, get_user as get_user_service, follow_user as follow_user_service};
pub use services::post_service::{create_post as create_post_service, get_post as get_post_service, like_post as like_post_service};

// Define the Contract struct for contract functionalities
#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
struct Contract {
    id: u64,
    name: String,
    owner: Principal,
    data: Vec<u8>,
}

impl Contract {
    fn new(id: u64, name: String, owner: Principal, data: Vec<u8>) -> Self {
        Contract { id, name, owner, data }
    }
}

// HashMaps to store Contracts, Users, and Posts
thread_local! {
    static CONTRACTS: std::cell::RefCell<HashMap<u64, Contract>> = std::cell::RefCell::new(HashMap::new());
    static USERS: std::cell::RefCell<HashMap<Principal, models::user::User>> = std::cell::RefCell::new(HashMap::new());
    static POSTS: std::cell::RefCell<HashMap<u64, models::post::Post>> = std::cell::RefCell::new(HashMap::new());
}

// Contract Management Functions
#[ic_cdk::update]
fn create_contract(id: u64, name: String, data: Vec<u8>) -> String {
    let owner = ic_cdk::caller();
    let contract = Contract::new(id, name, owner, data);

    CONTRACTS.with(|contracts| {
        contracts.borrow_mut().insert(id, contract);
    });

    format!("Contract with id {} created successfully.", id)
}

#[ic_cdk::query]
fn get_contract(id: u64) -> Option<Contract> {
    CONTRACTS.with(|contracts| contracts.borrow().get(&id).cloned())
}

// User Management Functions
#[ic_cdk::update]
fn create_user(username: String, bio: Option<String>) -> String {
    let user_id = ic_cdk::caller();
    let user = create_user_service(username, bio);

    USERS.with(|users| {
        users.borrow_mut().insert(user_id, user.clone());
    });

    format!("User {} created successfully.", user_id)
}

#[ic_cdk::query]
fn get_user() -> Option<models::user::User> {
    let user_id = ic_cdk::caller();
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}

#[ic_cdk::update]
fn follow_user(target_user_id: Principal) -> String {
    follow_user_service(target_user_id)
}

// Post Management Functions
//#[ic_cdk::update]
#[ic_cdk::query]
fn create_post(content: String, media_url: Option<String>) -> String {
    let user_id = ic_cdk::caller();
    let post = create_post_service(content, media_url);

    let post_id = post.id;
    POSTS.with(|posts| {
        posts.borrow_mut().insert(post_id, post.clone());
    });

    format!("Post {} created successfully by user {}.", post_id, user_id)
}

#[ic_cdk::query]
fn get_post(id: u64) -> Option<models::post::Post> {
    POSTS.with(|posts| posts.borrow().get(&id).cloned())
}

#[ic_cdk::update]
fn like_post(id: u64) -> String {
    like_post_service(id)
}

// Simple Greeting Function with Recommendations Placeholder
use serde_json::json;

#[ic_cdk::query]
fn greet(name: String) -> String {
    let post: String = "Post generated".to_string();
    let recommendations = "Recommendations generated";
    let post = create_post(post, Some("https://www.youtube.com/watch?v=w8yWXqWQYmU".to_string()));
    let user_one = create_user("User One".to_string(), None);
    let user_two = create_user("User Two".to_string(), None);

    format!("Hello, {}!\n{}\". Post: {}, User One: {}", name, recommendations, post, user_one)
}
