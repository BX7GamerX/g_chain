/*// src/lib.rs

pub mod controllers;
pub mod models;
pub mod services;
pub mod utils;

use hyper::{Body, Request, Response, Server};
use hyper::service::{make_service_fn, service_fn};
use async_std::task;
use crate::controllers::auth_controller::auth_routes;
use crate::controllers::recommendation_controller::recommendation_routes;
use serde_json::json;

// Define a basic handler for the root route
async fn handle_request(_req: Request<Body>) -> Result<Response<Body>, Infallible> {
    Ok(Response::new(Body::from("Welcome to GainChain Backend!")))
}

// Start the server with routes
#[async_std::main]
async fn main() {
    let make_svc = make_service_fn(|_conn| async {
        Ok::<_, Infallible>(service_fn(handle_request))
    });

    let addr = ([127, 0, 0, 1], 3000).into();
    let server = Server::bind(&addr).serve(make_svc);

    println!("Server running on http://{}", addr);

    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}

pub fn create_app() -> Router {
    Router::new()
        .merge(auth_routes())      // Auth routes (login, registration)
        .merge(recommendation_routes()) // Recommendation routes (e.g., greet, recommendations)
        .route("/", handle_request)  // Root route
}




*/

use ic_cdk_macros::query;

/// Example query function that greets the user and provides recommendations
#[query]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name, )
}
