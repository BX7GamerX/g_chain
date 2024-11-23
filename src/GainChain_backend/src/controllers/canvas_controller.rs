use std::cell::RefCell;

#[derive(Clone, candid::CandidType, serde::Deserialize, serde::Serialize)]
pub struct Canvas {
    pub id: String,
    pub elements: Vec<CanvasElement>,
    pub created_by: String,
    pub last_modified: String,
}

#[derive(Clone, candid::CandidType, serde::Deserialize, serde::Serialize)]
pub struct CanvasElement {
    pub id: String,
    pub data: String,
}

// Thread-local storage for canvas data
thread_local! {
    static CANVAS_STORAGE: RefCell<Vec<Canvas>> = RefCell::new(Vec::new());
}

// Initializes the canvas storage
pub fn initialize_canvas_storage() {
    CANVAS_STORAGE.with(|storage| {
        *storage.borrow_mut() = Vec::new(); // Initialize empty storage
    });
}

// Create a new canvas
#[ic_cdk_macros::update]
pub fn create_canvas(user_id: String) -> String {
    let canvas_id = format!("canvas-{}", ic_cdk::api::time());
    let new_canvas = Canvas {
        id: canvas_id.clone(),
        elements: vec![],
        created_by: user_id,
        last_modified: format!("{}", ic_cdk::api::time()),
    };

    CANVAS_STORAGE.with(|storage| {
        storage.borrow_mut().push(new_canvas);
    });

    format!("Canvas {} created successfully", canvas_id)
}

// Retrieve all canvases for a user
#[ic_cdk_macros::query]
pub fn get_user_canvases(user_id: String) -> Vec<Canvas> {
    CANVAS_STORAGE.with(|storage| {
        storage
            .borrow()
            .iter()
            .filter(|canvas| canvas.created_by == user_id)
            .cloned()
            .collect()
    })
}

// Update a canvas (add/edit elements)
#[ic_cdk_macros::update]
pub fn update_canvas(canvas_id: String, elements: Vec<CanvasElement>) -> String {
    CANVAS_STORAGE.with(|storage| {
        let mut canvases = storage.borrow_mut();
        if let Some(canvas) = canvases.iter_mut().find(|c| c.id == canvas_id) {
            canvas.elements = elements;
            canvas.last_modified = format!("{}", ic_cdk::api::time());
            format!("Canvas {} updated successfully", canvas_id)
        } else {
            format!("Canvas {} not found", canvas_id)
        }
    })
}

// Delete a canvas
#[ic_cdk_macros::update]
pub fn delete_canvas(canvas_id: String) -> String {
    CANVAS_STORAGE.with(|storage| {
        let mut canvases = storage.borrow_mut();
        if let Some(index) = canvases.iter().position(|c| c.id == canvas_id) {
            canvases.remove(index);
            format!("Canvas {} deleted successfully", canvas_id)
        } else {
            format!("Canvas {} not found", canvas_id)
        }
    })
}
use ic_cdk_macros::{query, update, init, pre_upgrade, post_upgrade};

/*use candid::{CandidType, Deserialize};
use serde::Serialize;
use std::cell::RefCell;

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct Canvas {
    pub id: String,
    pub elements: Vec<CanvasElement>,
    pub created_by: String,
    pub last_modified: String,
}

#[derive(Clone, Serialize, Deserialize, CandidType)]
pub struct CanvasElement {
    pub id: String,
    pub data: String,
}

// Persistent storage for canvas data
thread_local! {
    static CANVAS_STORAGE: RefCell<Vec<Canvas>> = RefCell::new(Vec::new());
}

// Initialize storage
#[init]
fn init() {
    CANVAS_STORAGE.with(|storage| {
        *storage.borrow_mut() = Vec::new(); // Initialize empty storage
    });
}

// Pre-upgrade: Save data to stable memory
#[pre_upgrade]
fn pre_upgrade() {
    let storage = CANVAS_STORAGE.with(|storage| storage.borrow().clone());
    ic_cdk::storage::stable_save((storage,)).expect("Failed to save data before upgrade");
}

// Post-upgrade: Restore data from stable memory
#[post_upgrade]
fn post_upgrade() {
    let (storage,): (Vec<Canvas>,) =
        ic_cdk::storage::stable_restore().expect("Failed to restore data after upgrade");
    CANVAS_STORAGE.with(|canvas_storage| {
        *canvas_storage.borrow_mut() = storage;
    });
}

// Add a new canvas
#[update]
#[candid::candid_method(update)]
pub fn create_canvas(user_id: String) -> String {
    let canvas_id = format!("canvas-{}", ic_cdk::api::time());
    let new_canvas = Canvas {
        id: canvas_id.clone(),
        elements: vec![],
        created_by: user_id,
        last_modified: format!("{}", ic_cdk::api::time()),
    };

    CANVAS_STORAGE.with(|storage| {
        storage.borrow_mut().push(new_canvas);
    });

    format!("Canvas {} created successfully", canvas_id)
}

// Retrieve all canvases for a user
#[query]
#[candid::candid_method(query)]
pub fn get_user_canvases(user_id: String) -> Vec<Canvas> {
    CANVAS_STORAGE.with(|storage| {
        storage
            .borrow()
            .iter()
            .filter(|canvas| canvas.created_by == user_id)
            .cloned()
            .collect()
    })
}

// Update a canvas (add/edit elements)
#[update]
#[candid::candid_method(update)]
pub fn update_canvas(canvas_id: String, elements: Vec<CanvasElement>) -> String {
    CANVAS_STORAGE.with(|storage| {
        let mut canvases = storage.borrow_mut();
        if let Some(canvas) = canvases.iter_mut().find(|c| c.id == canvas_id) {
            canvas.elements = elements;
            canvas.last_modified = format!("{}", ic_cdk::api::time());
            format!("Canvas {} updated successfully", canvas_id)
        } else {
            format!("Canvas {} not found", canvas_id)
        }
    })
}

// Delete a canvas
#[update]
#[candid::candid_method(update)]
pub fn delete_canvas(canvas_id: String) -> String {
    CANVAS_STORAGE.with(|storage| {
        let mut canvases = storage.borrow_mut();
        if let Some(index) = canvases.iter().position(|c| c.id == canvas_id) {
            canvases.remove(index);
            format!("Canvas {} deleted successfully", canvas_id)
        } else {
            format!("Canvas {} not found", canvas_id)
        }
    })
}
*/