// src/lib.rs

// Declare the services module at the crate root
pub mod services;

use ic_cdk_macros::query;
use serde_json::{Value, from_str, to_string};
use crate::services::neural_net_service::NeuralNetwork;

/// Example query function that greets the user.
#[query]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

/// Generates recommendations using the neural network.
#[query]
pub fn get_recommendations(user_data: String) -> String {
    let user_data: Value = from_str(&user_data).expect("Invalid JSON format");
    let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);
    let recommendations = neural_net.generate_recommendations(&user_data);
    to_string(&recommendations).expect("Failed to serialize recommendations")
}

/// Provides user project support backend configurations.
#[query]
pub fn get_project_support(user_data: String) -> String {
    let user_data: Value = from_str(&user_data).expect("Invalid JSON format");
    let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);
    let project_support = neural_net.generate_user_project_support(&user_data);
    to_string(&project_support).expect("Failed to serialize project support")
}


/*
use ic_cdk_macros::query;

/// Example query function that greets the user and provides recommendations
#[query]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name, )
}
*/