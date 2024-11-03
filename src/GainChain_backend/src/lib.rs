/*use std::collections::HashMap;
use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ic_cdk::{api, caller};
use ic_cdk::Principal;
//use ic_cdk::export::Principal; // Use IC's export for compatibility
mod models;
mod services;

use crate::services::user_service::{
    create_user as user_create, get_user as user_get, follow_user as user_follow,
};
use crate::services::post_service::{
    create_post as post_create, get_post as post_get, like_post as post_like,
};
use crate::services::recommendation_service::NeuralNetwork;
*/
use std::collections::HashMap;
use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ic_cdk::{api, caller};//, Principal};
mod models;
mod services;
use ic_cdk_macros::query;
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


pub fn create_contract(id: u64, name: String, data: Vec<u8>) -> String {
    let owner = caller();
    let contract = Contract::new(id, name, owner, data);

    CONTRACTS.with(|contracts| {
        contracts.borrow_mut().insert(id, contract);
    });

    format!("Contract with id {} created successfully.", id)
}

pub fn get_contract(id: u64) -> Option<Contract> {
    CONTRACTS.with(|contracts| contracts.borrow().get(&id).cloned())
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
pub fn initialize_recommender(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) {
    let network = NeuralNetwork::new(input_size, hidden_size, output_size, learning_rate);
    RECOMMENDER.with(|recommender| *recommender.borrow_mut() = Some(network));
}

pub fn generate_recommendation(user_data: serde_json::Value) -> String {
    // Convert recommendation output to a string for compatibility
    let recommendation_result = RECOMMENDER.with(|recommender| {
        if let Some(network) = &*recommender.borrow() {
            network.generate_recommendations(&user_data)
        } else {
            json!({"error": "Neural network not initialized"})
        }
    });
    recommendation_result.to_string() // Return as a string
}
#[query]
pub fn greet(name: String) -> String {
    let post_result = create_post(
        "Generated post content".to_string(),
        Some("https://example.com/image.png".to_string())
    );

    let user_data = json!([0.5, 0.8, 0.3]); // Example user data for recommendations

    let recommendations = generate_recommendation(user_data);

    format!("Hello, {}! Post creation result: {}\nRecommendations: {}", name, post_result, recommendations)
}


























// working except fo the macros 
/*use std::collections::HashMap;
use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use serde_json::json;
use ic_cdk_macros::{init, query, update};

mod models;
mod services;

// Import functions with alias to avoid name clashes
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

// Contract management functions
#[update]
fn create_contract(id: u64, name: String, data: Vec<u8>) -> String {
    let owner = ic_cdk::caller();
    let contract = Contract::new(id, name, owner, data);

    CONTRACTS.with(|contracts| {
        contracts.borrow_mut().insert(id, contract);
    });

    format!("Contract with id {} created successfully.", id)
}

#[query]
fn get_contract(id: u64) -> Option<Contract> {
    CONTRACTS.with(|contracts| contracts.borrow().get(&id).cloned())
}

// User management functions
#[update]
fn create_user(username: String, bio: Option<String>) -> String {
    let user_id = ic_cdk::caller();
    let user = user_create(username, bio);

    USERS.with(|users| {
        users.borrow_mut().insert(user_id, user.clone());
    });

    format!("User {} created successfully.", user_id)
}

#[query]
fn get_user() -> Option<models::user::User> {
    let user_id = ic_cdk::caller();
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}

#[update]
fn follow_user(target_user_id: Principal) -> String {
    user_follow(target_user_id)
}

// Post management functions
#[update]
fn create_post(content: String, media_url: Option<String>) -> String {
    let user_id = ic_cdk::caller();
    let post = post_create(content, media_url);

    let post_id = post.id;
    POSTS.with(|posts| {
        posts.borrow_mut().insert(post_id, post.clone());
    });

    format!("Post {} created successfully by user {}.", post_id, user_id)
}

#[query]
fn get_post(id: u64) -> Option<models::post::Post> {
    POSTS.with(|posts| posts.borrow().get(&id).cloned())
}

#[update]
fn like_post(id: u64) -> String {
    post_like(id)
}

// Recommendation functionality
#[init]
fn initialize_recommender(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) {
    let network = NeuralNetwork::new(input_size, hidden_size, output_size, learning_rate);
    RECOMMENDER.with(|recommender| *recommender.borrow_mut() = Some(network));
}

#[query]
fn generate_recommendation(user_data: serde_json::Value) -> serde_json::Value {
    RECOMMENDER.with(|recommender| {
        if let Some(network) = &*recommender.borrow() {
            network.generate_recommendations(&user_data)
        } else {
            json!({"error": "Neural network not initialized"})
        }
    })
}

// Greet function with embedded recommendation generation
#[query]
fn greet(name: String) -> String {
    let post_result = create_post(
        "Generated post content".to_string(),
        Some("https://example.com/image.png".to_string())
    );

    let user_id = ic_cdk::caller();
    let user_data = json!([0.5, 0.8, 0.3]); // Example user data for recommendations

    let recommendations = generate_recommendation(user_data);

    format!("Hello, {}! Post creation result: {:?}\nRecommendations: {:?}", name, post_result, recommendations)
}

*/

/*use std::collections::HashMap;
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
    let user_data_one = [0.7, 15.5, 0.9];

   let recomend = generate_recommendation(json!(user_data_one));
   // let recomend = generate_recommendations(json!(45));
    format!("Hello, {}!\n{}\". Post: {}, User One: {}\n{}", name, recommendations, post, user_one,recomend)
    //format!("Hello, {}!\n{}\". Post: {}, User One: {}", name, recommendations, post, user_one)
}
/************************************************************************************************ */
use ic_cdk_macros::{init, query};
use ic_cdk::export::candid::Principal;
use serde_json::Value;
use crate::services::recommendation_service::NeuralNetwork;

//mod services;

thread_local! {
    static RECOMMENDER: std::cell::RefCell<Option<NeuralNetwork>> = std::cell::RefCell::new(None);
}

/// Initialize the recommendation neural network
#[init]
fn initialize_recommender(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) {
    let network = NeuralNetwork::new(input_size, hidden_size, output_size, learning_rate);
    RECOMMENDER.with(|recommender| *recommender.borrow_mut() = Some(network));
}

/// Query function to generate recommendations
#[query]
fn generate_recommendation(user_data: Value) -> Value {
    RECOMMENDER.with(|recommender| {
        if let Some(network) = &*recommender.borrow() {
            network.generate_recommendations(&user_data)
        } else {
            serde_json::json!({"error": "Neural network not initialized"})
        }
    })
}

/*********************************************** */
*/