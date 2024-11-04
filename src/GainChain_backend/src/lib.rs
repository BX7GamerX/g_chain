use std::collections::HashMap;
use candid::{CandidType, Principal, Nat};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ic_cdk::caller;
use ic_cdk_macros::{init, query, update};
mod models;
mod services;

use services::wallet::{get_balance, earn_coins, send_coins};
use crate::services::user_service::{
    create_user as user_create, get_user as user_get, follow_user as user_follow,
};
use crate::services::post_service::{
    create_post as post_create, get_post as post_get, like_post as post_like,
};
use crate::services::recommendation_service::NeuralNetwork;

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

thread_local! {
    static CONTRACTS: std::cell::RefCell<HashMap<u64, Contract>> = std::cell::RefCell::new(HashMap::new());
    static USERS: std::cell::RefCell<HashMap<Principal, models::user::User>> = std::cell::RefCell::new(HashMap::new());
    static POSTS: std::cell::RefCell<HashMap<u64, models::post::Post>> = std::cell::RefCell::new(HashMap::new());
    static RECOMMENDER: std::cell::RefCell<Option<NeuralNetwork>> = std::cell::RefCell::new(None);
}

/// Initializes the canister and sets up the recommendation network
#[init]
fn canister_init() {
    let network = NeuralNetwork::new(3, 4, 2, 0.01); // Adjust size based on your model's needs
    RECOMMENDER.with(|recommender| *recommender.borrow_mut() = Some(network));
}

/// Query the user's current wallet balance
#[query]
fn query_balance() -> Nat {
    get_balance()
}

/// Add coins to the user's wallet (e.g., from likes)
#[update]
fn add_coins(amount: Nat) -> Nat {
    earn_coins(amount)
}

pub fn create_user(username: String, bio: Option<String>) -> String {
    let user_id = caller();
    let user = user_create(username, bio);

    USERS.with(|users| {
        users.borrow_mut().insert(user_id, user.clone());
    });

    format!("User {} created successfully.", user_id)
}

pub fn get_user() -> Option<models::user::User> {
    let user_id = caller();
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}

pub fn create_post(content: String, media_url: Option<String>) -> String {
    let user_id = caller();
    let post = post_create(content, media_url);

    let post_id = post.id;
    POSTS.with(|posts| {
        posts.borrow_mut().insert(post_id, post.clone());
    });

    format!("Post {} created successfully by user {}.", post_id, user_id)
}

pub fn like_post(id: u64) -> String {
    post_like(id)
}

/// Generates recommendations based on user data
pub fn generate_recommendation(user_data: serde_json::Value) -> String {
    let recommendation_result = RECOMMENDER.with(|recommender| {
        if let Some(network) = &*recommender.borrow() {
            network.generate_recommendations(&user_data)
        } else {
            json!({"error": "Neural network not initialized"})
        }
    });
    recommendation_result.to_string()
}

#[query]
pub fn greet(name: String) -> String {
    let post_result = create_post(
        "Generated post content".to_string(),
        Some("https://example.com/image.png".to_string())
    );
    let user_data = json!([0.5, 0.8, 0.3]); // Example data for recommendation
    let recommendations = generate_recommendation(user_data);
    let _ = transfer_coins(Principal::from_text("aaaaa-aa").unwrap(), Nat::from(100u64));
    format!("Hello, {}! Post creation result: {}\nRecommendations: {}", name, post_result, recommendations)
}

/// Transfer coins to another user
#[update]
fn transfer_coins(recipient: Principal, amount: Nat) -> Result<String, String> {
    send_coins(caller(), recipient, amount)
}
