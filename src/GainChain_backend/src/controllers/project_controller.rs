//src/GainChain_backend/src/controllers/project_controller.rs
use candid::{CandidType, Decode, Encode};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use serde_json::json;
use std::sync::RwLock;
use crate::models::project_model::Project;
fn generate_unique_id() -> String {
    let timestamp = ic_cdk::api::time(); // Nanoseconds since Unix epoch
    format!("project-{}", timestamp)
}
/*
#[derive(Serialize, Deserialize, Clone, CandidType, Debug, Default)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
}
*/

#[derive(Serialize, Deserialize, Clone, CandidType, Debug, Default)]
pub struct Projects {
    pub projects: HashMap<String, Project>,
}


use std::sync::LazyLock;

pub static PROJECTS: LazyLock<RwLock<Projects>> = LazyLock::new(|| RwLock::new(Projects::default()));


/// Save data to stable memory
fn save_to_stable_memory() {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    let encoded = Encode!(&*projects).expect("Failed to encode projects");
        let current_size = ic_cdk::api::stable::stable_size() * 65536;
        if encoded.len() > current_size as usize {
            let additional_pages = ((encoded.len() as u64 - current_size + 65535) / 65536) as u64;
            ic_cdk::api::stable::stable_grow(additional_pages).expect("Failed to grow stable memory");
        }
        ic_cdk::api::stable::stable_write(0, &encoded);
    }


/// Load data from stable memory
fn load_from_stable_memory() {
    let memory_size = ic_cdk::api::stable::stable_size() * 65536;
    if memory_size == 0 {
        return; // No data to load
    }
    let mut buffer = vec![0; memory_size as usize];
    ic_cdk::api::stable::stable_read(0, &mut buffer);
    if let Ok(decoded) = Decode!(&buffer, Projects) {
        let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
        *projects = decoded;
    }
}

/// Initialize storage
#[ic_cdk_macros::init]
fn init() {
    load_from_stable_memory();
}

/// Create a new project
#[ic_cdk_macros::update]
pub fn create_project(user_id: String, name: String, description: String) -> String {
    let project_id = generate_unique_id();
    let new_project = Project {
        id: project_id.clone(),
        user_id,
        name,
        description,
        created_at: ic_cdk::api::time().to_string(),
    };
    let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
    projects.projects.insert(project_id.clone(), new_project);
    save_to_stable_memory();

    format!("Project {} created successfully", project_id)
    }


/// List all projects for a user
#[ic_cdk_macros::query]
pub fn list_user_projects(user_id: String) -> String {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    let user_projects: Vec<_> = projects
        .projects
        .values()
        .filter(|p| p.user_id == user_id)
        .cloned()
        .collect();

        serde_json::to_string(&user_projects).expect("Failed to serialize projects")
    }

/// Delete a project
#[ic_cdk_macros::update]
pub fn delete_project(project_id: String) -> String {
    let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
    let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
    if projects.projects.remove(&project_id).is_some() {
            format!("Project {} deleted successfully", project_id)
        } else {
            format!("Project {} not found", project_id)
        }
    }
#[ic_cdk_macros::query]
pub fn suggest_project_improvements(project_id: String) -> String {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    match projects.projects.get(&project_id) {
        Some(project) => {
            let project_data = json!({
                "name": project.name,
                "description": project.description
            });
            let recommendations = recommend_features(&project_data);
            serde_json::to_string(&recommendations).expect("Failed to serialize recommendations")
        }
        None => format!("Project {} not found", project_id),
    }
}

/// Recommend features for a project
fn recommend_features(project_data: &serde_json::Value) -> serde_json::Value {
    // Dummy implementation for recommendations
    json!({
        "recommendations": [
            "Add more details to the project description",
            "Consider adding a timeline for the project"
        ]
    })
}

pub fn get_project(project_id: String) -> Option<Project> {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    projects.projects.get(&project_id).cloned()
}   