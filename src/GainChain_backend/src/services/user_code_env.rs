use ic_cdk::query;
//src/GainChain_backend/src/services/user_code_env.rs
use ic_cdk_macros::init;
use nalgebra::DVector;
use ndarray::Array;
use crate::controllers::canvas_controller::initialize_canvas_storage;
use crate::controllers::project_controller::{create_project, get_project};
use crate::controllers::recommendation_controller;
use crate::controllers::user_controller::{create_user,get_user_details};
use crate::models::user_model::User;
use serde_json::{from_str, Value,to_string};
use crate::services::neural_net_service::NeuralNetwork;
use std::collections::HashMap;

/// Initialize the recommendation dictionary with keys 0 to 9 and their respective recommendations.
fn initialize_recommendation_dict() -> HashMap<u32, &'static str> {
    let mut recommendation_dict = HashMap::new();
    recommendation_dict.insert(0, "Improve user interface design.");
    recommendation_dict.insert(1, "Enhance backend scalability.");
    recommendation_dict.insert(2, "Optimize database performance.");
    recommendation_dict.insert(3, "Add more security features.");
    recommendation_dict.insert(4, "Implement advanced analytics.");
    recommendation_dict.insert(5, "Integrate third-party APIs.");
    recommendation_dict.insert(6, "Provide comprehensive documentation.");
    recommendation_dict.insert(7, "Incorporate AI-driven insights.");
    recommendation_dict.insert(8, "Test edge-case scenarios thoroughly.");
    recommendation_dict.insert(9, "Simplify deployment processes.");
    recommendation_dict
}
/// Takes in a float score and returns a recommendation string based on the dictionary.
#[allow(dead_code)]
fn get_recommendation_from_score(score: f32) -> String {
    let recommendation_dict = initialize_recommendation_dict();

    // Scale the float to a dictionary key (0 to 9). We clamp the value to avoid out-of-bound keys.
    let key = (score * 10.0).round().clamp(0.0, 9.0) as u32;

    // Fetch the recommendation from the dictionary or provide a fallback.
    recommendation_dict
        .get(&key)
        .cloned()
        .unwrap_or("No recommendation available.")
        .to_string()
}
/*#[init]
fn init() {
    // Initialize the canvas storage
    initialize_canvas_storage();

    // Add any other initialization logic here if necessary
}*/
//iteratior through recommendation values then use the values to pull out a string from the get_recommendation_from_score method

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
    };    //create_project(user_id, name, description);   //create_project(user_id, name, description);
// iteratior through recommendation values
let mut recommendations_list: Vec<String> = Vec::new();
if let Ok(rec_values) = serde_json::from_str::<Vec<f32>>(&recommendations) {
    for i in rec_values {
        recommendations_list.push(get_recommendation_from_score(i));
    }
}

format!("Hello, {}! Welcome to GainChain!\n{}, \n
        The user id is {}\n{:?}", name.clone(), return_str_user, "123", recommendations_list)
    
}

