//src/GainChain_backend/src/lib.rs
pub mod controllers;
pub mod services;
pub mod models;

use ic_cdk_macros::query;
use controllers::project_controller::{create_project, list_user_projects, delete_project};
use crate::services::neural_net_service::NeuralNetwork;

use serde_json::{Value, from_str, to_string};

/// Example query function.
#[query]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

/// Generates recommendations using the neural network.
#[query]
pub fn get_recommendations(user_data: String) -> String {
    match from_str::<Value>(&user_data) {
        Ok(user_data) => {
            let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);
            let recommendations = neural_net.generate_recommendations(&user_data);
            to_string(&recommendations).unwrap_or_else(|_| "Failed to serialize recommendations".to_string())
        }
        Err(_) => "Invalid JSON format".to_string(),
    }
}

/// Provides backend support for user projects.
#[query]
pub fn get_project_support(user_data: String) -> String {
    let user_data: Value = from_str(&user_data).expect("Invalid JSON format");
    let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);
    let project_support = neural_net.generate_user_project_support(&user_data);
    to_string(&project_support).expect("Failed to serialize project support")
}
