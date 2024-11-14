// src/controllers/auth_controller.rs

use hyper::{Body, Request, Response};
use serde_json::json;

pub fn auth_routes() -> Router {
    Router::new().route("/login", get(login_handler))
}

async fn login_handler() -> impl IntoResponse {
    let response = json!({
        "status": "success",
        "message": "Login with Internet Identity initiated",
        "internet_identity_url": "https://identity.ic0.app/#authorize"
    });

    Response::new(Body::from(response.to_string()))
}
