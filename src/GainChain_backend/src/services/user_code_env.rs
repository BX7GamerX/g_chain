use ic_cdk::query;
//src/GainChain_backend/src/services/user_code_env.rs
use ic_cdk_macros::init;
use crate::controllers::canvas_controller::initialize_canvas_storage;
use crate::controllers::project_controller::{create_project, get_project};
use crate::controllers::user_controller::{create_user,get_user_details};
use crate::models::user_model::User;
use serde_json::{from_str, Value,to_string};
use crate::services::neural_net_service::NeuralNetwork;
/*#[init]
fn init() {
    // Initialize the canvas storage
    initialize_canvas_storage();

    // Add any other initialization logic here if necessary
}*/
#[query]
fn new_user_start(name: String, email: String) -> String {
    
    let return_str_user = create_user(name.clone(), email);
    let user_id = "123".to_string();
    // Example input for the get_recommendation function
let test_floats: Vec<f32> = vec![
    0.75, // Represents feature 1 value
    1.2,  // Represents feature 2 value
    -0.5, // Represents feature 3 value
    0.0,  // Represents feature 4 value
    2.3,  // Represents feature 5 value
    1.8,  // Represents feature 6 value
];

// Call the get_recommendation function with the test data

    let recommendations = 
    match from_str::<Value>(&serde_json::to_string(&test_floats).unwrap()) {
        Ok(user_data) => {
            let neural_net = NeuralNetwork::new(10, 64, 5, 0.01);
            let recommendations = neural_net.generate_recommendations(&user_data);
            to_string(&recommendations).unwrap_or_else(|_| "Failed to serialize recommendations".to_string())
        }
        Err(_) => "Invalid JSON format".to_string(),
    };    //create_project(user_id, name, description);
    
    format!("Hello, {}! Welcome to GainChain!\n{}, \n
    The user id is {}\n{}", name.clone(), return_str_user, "123", recommendations)
}
/*
// Function to initialize the neural network
fn initialize_neural_network(user_id: String, project_description: String) {
    // Example: Setting initial arguments for recommendations
    let neural_net_args = format!(
        "Initializing for User: {}, with Project Description: {}",
        user_id, project_description
    );

    // Call the neural network service or logic with the arguments
    // Here, we assume there's a `neural_net_service::initialize` function
    neural_net_service::initialize(user_id, project_description, neural_net_args);

    // Log initialization (for debugging purposes)
    ic_cdk::println!("Neural network initialized: {}", neural_net_args);
}*/

/* 
#[query]
fn new_project(user_id: String, name: String, description: String) -> String {

    let project_id = create_project(user_id, name.clone(), description);
    format!("Project {} created successfully\n{:?}", name, get_project(project_id).unwrap())
}
fn new_user_start(name: String, email: String) -> String {
    let return_str_user = create_user(name.clone(), email);
    let user_id = "123".to_string();
    let return_str_project = create_project(user_id.clone(), "Project 1".to_string(), "Description 1".to_string());
    //create_project(user_id, name, description);
    format!("Hello, {}! Welcome to GainChain!\n{}, \n
    The user id is {}\nTo start off we have created this project for you {}\n
    !", name.clone(),return_str_user,get_user_details(user_id),return_str_project);
    "home".to_string()
*/