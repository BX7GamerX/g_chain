// src/controllers/neural_net_controller.rs
use crate::services::neural_net_service;

pub fn run_neural_network(data: Vec<f64>) -> Vec<f64> {
    neural_net_service::process_data(data)
}
