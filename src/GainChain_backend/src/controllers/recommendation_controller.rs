// src/controllers/recommendation_controller.rs

use hyper::{Body, Request, Response};
use crate::services::neural_net_service::recommend_posts;
use serde_json::json;

pub fn recommendation_routes() -> Router {
    Router::new().route("/recommendations/greet", get(recommend_handler))
}

async fn recommend_handler() -> impl IntoResponse {
    // Example user data for testing
    let user_data = json!([0.5, 0.8, 0.3, 0.2, 0.4, 0.1, 0.6, 0.7, 0.2, 0.9]);

    let recommendations = recommend_posts(&user_data);

    let recommendation_output: Vec<String> = recommendations
        .iter()
        .map(|project| format!("Project ID: {}, Score: {:.2}", project.id, project.score))
        .collect();

    let formatted_recommendations = recommendation_output.join("\n");

    let response = json!({
        "message": "Recommendations based on your activity",
        "recommendations": formatted_recommendations
    });

    Response::new(Body::from(response.to_string()))
}
