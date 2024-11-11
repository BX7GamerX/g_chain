// src/GainChain_backend/controllers/project_controller.rs
use crate::services::project_service::{create_project, get_projects};
use crate::models::project_model::Project;

pub fn create_new_project(user_id: &str, name: &str, description: &str) -> Project {
    create_project(user_id, name, description)
}

pub fn list_projects(user_id: &str) -> Vec<Project> {
    get_projects(user_id)
}
