use std::collections::HashMap;
use candid::{CandidType, Principal, Nat};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ic_cdk::caller;
use ic_cdk_macros::{query, update, init};

mod models;
mod services;

use crate::services::wallet::{earn_coins, get_balance, send_coins}; // Add wallet imports
use crate::services::user_service::create_user as user_create;
use crate::services::post_service::{create_post as post_create, like_post as post_like};
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

/// Initialization function to set up the recommender network
//use ic_cdk_macros::init;

#[init]
fn init_canister() {
    // Initialize the recommender neural network with chosen parameters.
    initialize_recommender(3, 4, 2, 0.01); // Adjust these parameters if needed
}



#[update]
pub fn create_contract(id: u64, name: String, data: Vec<u8>) -> String {
    let owner = caller();
    let contract = Contract::new(id, name, owner, data);

    CONTRACTS.with(|contracts| {
        contracts.borrow_mut().insert(id, contract);
    });

    format!("Contract with id {} created successfully.", id)
}

#[query]
pub fn get_contract(id: u64) -> Option<Contract> {
    CONTRACTS.with(|contracts| contracts.borrow().get(&id).cloned())
}

#[update]
pub fn create_user(username: String, bio: Option<String>) -> String {
    let user_id = caller();
    let user = user_create(username, bio);

    USERS.with(|users| {
        users.borrow_mut().insert(user_id, user.clone());
    });

    format!("User {} created successfully.", user_id)
}

#[query]
pub fn get_user() -> Option<models::user::User> {
    let user_id = caller();
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}

#[update]
pub fn create_post(content: String, media_url: Option<String>) -> String {
    let user_id = caller();
    let post = post_create(content, media_url);

    let post_id = post.id;
    POSTS.with(|posts| {
        posts.borrow_mut().insert(post_id, post.clone());
    });

    format!("Post {} created successfully by user {}.", post_id, user_id)
}

#[update]
pub fn like_post(id: u64) -> String {
    post_like(id)
}

#[update]
pub fn add_coins(amount: Nat) -> Nat {
    earn_coins(amount)
}

#[query]
pub fn query_balance() -> Nat {
    get_balance()
}

#[update]
pub fn transfer_coins(recipient: Principal, amount: Nat) -> Result<String, String> {
    send_coins(caller(), recipient, amount)
}

/// Helper function to initialize the recommender neural network.
fn initialize_recommender(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) {
    let network = NeuralNetwork::new(input_size, hidden_size, output_size, learning_rate);
    RECOMMENDER.with(|recommender| *recommender.borrow_mut() = Some(network));
}


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

    format!(
        "Hello, {}! Post creation result: {}\nRecommendations: {}",
        name, post_result, recommendations
    )
}
