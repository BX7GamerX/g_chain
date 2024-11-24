//src/GainChain_backend/src/controllers/project_controller.rs
use candid::{CandidType, Decode, Encode};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::RwLock;
use ic_cdk::api::time;

#[derive(Serialize, Deserialize, CandidType, Clone, Debug, Default)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
    pub created_at: String,
}

#[derive(Serialize, Deserialize, CandidType, Clone, Debug, Default)]
pub struct Projects {
    pub projects: HashMap<String, Project>,
}

use std::sync::LazyLock;

pub static PROJECTS: LazyLock<RwLock<Projects>> = LazyLock::new(|| RwLock::new(Projects::default()));

/// Generate a unique project ID
fn generate_unique_id() -> String {
    format!("project-{}", time())
}

/// Save projects to stable memory
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

/// Load projects from stable memory
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

/// Initialize the project storage
#[ic_cdk_macros::init]
fn init() {
    load_from_stable_memory();
}

/// Pre-upgrade: Save data to stable memory
#[ic_cdk_macros::pre_upgrade]
fn pre_upgrade() {
    save_to_stable_memory();
}

/// Post-upgrade: Load data from stable memory
#[ic_cdk_macros::post_upgrade]
fn post_upgrade() {
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
        created_at: time().to_string(),
    };

    let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
    projects.projects.insert(project_id.clone(), new_project);
    save_to_stable_memory();

    format!("Project {} created successfully", project_id)
}

/// List all projects for a user
#[ic_cdk_macros::query]
pub fn list_user_projects(user_id: String) -> Vec<Project> {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    projects
        .projects
        .values()
        .filter(|p| p.user_id == user_id)
        .cloned()
        .collect()
}

/// Delete a project
#[ic_cdk_macros::update]
pub fn delete_project(project_id: String) -> String {
    let mut projects = PROJECTS.write().expect("Failed to acquire write lock");
    if projects.projects.remove(&project_id).is_some() {
        save_to_stable_memory();
        format!("Project {} deleted successfully", project_id)
    } else {
        format!("Project {} not found", project_id)
    }
}

/// Retrieve a specific project by ID
#[ic_cdk_macros::query]
pub fn get_project(project_id: String) -> Option<Project> {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    projects.projects.get(&project_id).cloned()
}

pub fn get_project_by_id(project_id: String) -> Option<Project> {
    let projects = PROJECTS.read().expect("Failed to acquire read lock");
    projects.projects.get(&project_id).cloned()
}