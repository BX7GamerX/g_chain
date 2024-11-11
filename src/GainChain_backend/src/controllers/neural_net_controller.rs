// src/GainChain_backend/controllers/neural_net_controller.rs
use crate::services::neural_net_service::recommend_posts;
use crate::models::project_model::Project;

pub fn get_post_recommendations(user_id: &str) -> Vec<Project> {
    recommend_posts(user_id)
}
