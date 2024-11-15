// src/controllers/project_controller.rs

use tide::{Request, Response};
use crate::services::neural_net_service::NeuralNetwork;
use serde_json::json;

pub async fn project_support_handler(req: Request<()>) -> tide::Result<Response> {
    // Example JSON input for testing
    let user_data = req.body_json::<serde_json::Value>().await.unwrap_or_else(|_| {
        json!([0.5, 0.8, 0.3, 0.2, 0.4, 0.1, 0.6, 0.7, 0.2, 0.9])
    });

    // Initialize the neural network
    let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);

    // Generate project support configurations
    let project_support = neural_net.generate_user_project_support(&user_data);

    // Return the JSON response
    Ok(Response::builder(200).body(project_support.to_string()).build())
}
