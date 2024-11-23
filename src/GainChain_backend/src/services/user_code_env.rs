use ic_cdk::query;
use ic_cdk_macros::init;
use crate::controllers::canvas_controller::initialize_canvas_storage;
use crate::controllers::project_controller::{create_project, get_project};
use crate::controllers::user_controller::{create_user,get_user_details};
use crate::models::user_model::User;
/*#[init]
fn init() {
    // Initialize the canvas storage
    initialize_canvas_storage();

    // Add any other initialization logic here if necessary
}*/
#[query]
fn new_user_start(name: String, email: String) -> String {
    
    let return_str_user = create_user(name.clone(), email);
    let user_id = "123".to_string();
    //create_project(user_id, name, description);
    format!("Hello, {}! Welcome to GainChain!\n{}, \n
    The user id is {}", name.clone(),return_str_user,get_user_details("123".to_string()),)
}

#[query]
fn new_project(user_id: String, name: String, description: String) -> String {

    let project_id = create_project(user_id, name.clone(), description);
    format!("Project {} created successfully\n{:?}", name, get_project(project_id).unwrap())
}
/* fn new_user_start(name: String, email: String) -> String {
    let return_str_user = create_user(name.clone(), email);
    let user_id = "123".to_string();
    let return_str_project = create_project(user_id.clone(), "Project 1".to_string(), "Description 1".to_string());
    //create_project(user_id, name, description);
    format!("Hello, {}! Welcome to GainChain!\n{}, \n
    The user id is {}\nTo start off we have created this project for you {}\n
    !", name.clone(),return_str_user,get_user_details(user_id),return_str_project);
    "home".to_string()
*/