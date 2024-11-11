// src/controllers/project_controller.rs
use crate::models::project_model::Project;
use crate::services::project_service;

pub fn create_project(name: &str, description: &str) -> Result<Project, String> {
    project_service::create_new_project(name, description)
}
