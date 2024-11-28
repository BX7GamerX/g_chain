// src/controllers/recommendation_controller.rs
use ic_cdk_macros::{query, update};
use serde_json::Value;
use crate::services::neural_net_service::NeuralNetwork;
use serde_json::json;

/// Handles recommendation requests.
//#[query]
pub fn get_recommendations(user_data: String) -> String {
    // Parse input user data or use default example data
    let user_data: Value = serde_json::from_str(&user_data).unwrap_or_else(|_| {
        json!([0.5, 0.8, 0.3, 0.2, 0.4, 0.1, 0.6, 0.7, 0.2, 0.9])
    });

    // Initialize the neural network
    let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);

    // Generate recommendations
    let recommendations = neural_net.generate_recommendations(&user_data);

    // Return the JSON response
    serde_json::to_string(&recommendations).expect("Failed to serialize recommendations")
}
