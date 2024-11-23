//src/GainChain_backend/src/models/user_model.rs
use serde::{Serialize, Deserialize};
use candid::{CandidType, Decode, Encode};
use std::sync::RwLock;

#[derive(Serialize, Deserialize, CandidType, Clone, Debug)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub created_at: String,
}

impl User {
    /// Encode user data for storage in stable memory
    pub fn encode(&self) -> Vec<u8> {
        Encode!(self).expect("Failed to encode user data")
    }

    /// Decode user data from stable memory
    pub fn decode(data: &[u8]) -> Self {
        Decode!(data, User).expect("Failed to decode user data")
    }
}

type Users = Vec<User>;
//use std::cell::RefCell;
pub static USERS: RwLock<Vec<User>> = RwLock::new(Vec::new());
/*thread_local! {
    pub static USERS: RefCell<Vec<User>> = RefCell::new(Vec::new());
}*/
//#[ic_cdk_macros::query]
pub fn get_all_users() -> Vec<User> {
    USERS.read().unwrap().clone()
}