// src/GainChain_backend/services/project_service.rs
use crate::models::project_model::Project;
use crate::helpers::storage_helper::{save_to_file, load_from_file};
use uuid::Uuid;
use std::time::{SystemTime, UNIX_EPOCH};

const PROJECT_DATA_FILE: &str = "data/projects.json";

pub fn create_project(user_id: &str, name: &str, description: &str) -> Project {
    let project = Project {
        id: Uuid::new_v4().to_string(),
        user_id: user_id.to_string(),
        name: name.to_string(),
        description: description.to_string(),
        created_at: SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_secs(),
    };

    let mut projects = load_projects();
    projects.push(project.clone());
    save_to_file(&projects, PROJECT_DATA_FILE).expect("Failed to save project data");

    project
}

pub fn get_projects(user_id: &str) -> Vec<Project> {
    let projects = load_projects();
    projects.into_iter().filter(|proj| proj.user_id == user_id).collect()
}

fn load_projects() -> Vec<Project> {
    load_from_file(PROJECT_DATA_FILE).unwrap_or_else(|_| vec![])
}
