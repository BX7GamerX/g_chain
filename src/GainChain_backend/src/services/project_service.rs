// src/services/project_service.rs
use crate::models::project_model::Project;

pub fn create_new_project(name: &str, description: &str) -> Result<Project, String> {
    Ok(Project { id: 1, name: name.to_string(), description: description.to_string() })
}
