//src/GainChain_backend/src/controllers/project_controller.rs
use candid::{CandidType, Decode, Encode};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::cell::RefCell;
use uuid::Uuid;

fn generate_unique_id() -> String {
    let timestamp = ic_cdk::api::time(); // Nanoseconds since the Unix epoch
    format!("project-{}", timestamp)
}

#[derive(Serialize, Deserialize, Clone, CandidType, Debug, Default)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
}

#[derive(Serialize, Deserialize, Clone, CandidType, Debug, Default)]
pub struct Projects {
    pub projects: HashMap<String, Project>,
}

// Thread-local storage for the projects
thread_local! {
    static PROJECTS: RefCell<Projects> = RefCell::new(Projects::default());
}

/// Save data to stable memory
fn save_to_stable_memory() {
    PROJECTS.with(|projects| {
        let encoded = Encode!(&*projects.borrow()).expect("Failed to encode projects");
        ic_cdk::api::stable::stable_write(0, &encoded);
    });
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
        PROJECTS.with(|projects| *projects.borrow_mut() = decoded);
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
    let project_id = generate_unique_id(); // Use the custom ID generator
    let new_project = Project {
        id: project_id.clone(),
        user_id,
        name,
        description,
    };

    PROJECTS.with(|projects| {
        projects.borrow_mut().projects.insert(project_id.clone(), new_project);
    });

    save_to_stable_memory();

    format!("Project {} created successfully", project_id)
}

/// List all projects for a user
#[ic_cdk_macros::query]
pub fn list_user_projects(user_id: String) -> String {
    PROJECTS.with(|projects| {
        let user_projects: Vec<_> = projects
            .borrow()
            .projects
            .values()
            .filter(|p| p.user_id == user_id)
            .cloned()
            .collect();

        serde_json::to_string(&user_projects).expect("Failed to serialize projects")
    })
}

/// Delete a project
#[ic_cdk_macros::update]
pub fn delete_project(project_id: String) -> String {
    PROJECTS.with(|projects| {
        let mut projects = projects.borrow_mut();
        if projects.projects.remove(&project_id).is_some() {
            save_to_stable_memory();
            format!("Project {} deleted successfully", project_id)
        } else {
            format!("Project {} not found", project_id)
        }
    })
}

/*

use serde_json::json;
use ic_cdk::storage;
use uuid::Uuid;
// Define a structure to hold project data
#[derive(serde::Serialize, serde::Deserialize, Clone)]
pub struct Project {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub description: String,
}

type Projects = Vec<Project>;

/// Create a new project
#[ic_cdk_macros::update]
pub fn create_project(user_id: String, name: String, description: String) -> String {
    let mut projects: Projects = storage::get_mut();
    let project_id = uuid::Uuid::new_v4().to_string(); // Generate a unique ID
    let new_project = Project {
        id: project_id.clone(),
        user_id,
        name,
        description,
    };
    projects.push(new_project);
    format!("Project {} created successfully", project_id)
}

/// List all projects for a user
#[ic_cdk_macros::query]
pub fn list_user_projects(user_id: String) -> String {
    let projects: Projects = storage::get();
    let user_projects: Vec<_> = projects.iter().filter(|p| p.user_id == user_id).collect();
    serde_json::to_string(&user_projects).expect("Failed to serialize projects")
}

/// Delete a project
#[ic_cdk_macros::update]
pub fn delete_project(project_id: String) -> String {
    let mut projects: Projects = storage::get_mut();
    if let Some(index) = projects.iter().position(|p| p.id == project_id) {
        projects.remove(index);
        format!("Project {} deleted successfully", project_id)
    } else {
        format!("Project {} not found", project_id)
    }
}
*/