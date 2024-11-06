use std::collections::HashMap;

fn create_tokenizer(input: &str) -> Vec<String> {
    input.split_whitespace().map(String::from).collect()
}

fn check_key_in_input(input: &str, rust_code_dict: &HashMap<String, String>) -> String {
    let key_words = create_tokenizer(input);
    for element in key_words {
        if rust_code_dict.contains_key(&element) {
            return rust_code_dict.get(&element).unwrap().to_string();
        }
    }
    "Key not found".to_string()
}


pub fn generate_code(input: &str) -> String {
    let rust_code_dict: HashMap<String, String> = vec![
        ("basic".to_string(), r#"
use ic_cdk::export::candid::Nat;
use ic_cdk_macros::{update, query};

#[ic_cdk::state]
static mut COUNTER: Nat = Nat::from(0);

#[update]
fn increment() {
    unsafe {
        COUNTER += 1;
    }
}

#[query]
fn get_counter() -> Nat {
    unsafe { COUNTER.clone() }
}
"#.to_string()),

        ("key-value-store".to_string(), r#"
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk_macros::{update, query};
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
struct Entry {
    key: String,
    value: String,
}

#[ic_cdk::state]
static mut STORE: Option<HashMap<String, String>> = None;

#[update]
fn set(key: String, value: String) {
    let store = unsafe { STORE.get_or_insert_with(HashMap::new) };
    store.insert(key, value);
}

#[query]
fn get(key: String) -> Option<String> {
    let store = unsafe { STORE.as_ref()? };
    store.get(&key).cloned()
}
"#.to_string()),

        ("user-profile".to_string(), r#"
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk_macros::{update, query};
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
struct UserProfile {
    name: String,
    age: u8,
    bio: String,
}

#[ic_cdk::state]
static mut PROFILES: Option<HashMap<String, UserProfile>> = None;

#[update]
fn create_profile(user_id: String, name: String, age: u8, bio: String) {
    let profiles = unsafe { PROFILES.get_or_insert_with(HashMap::new) };
    profiles.insert(user_id, UserProfile { name, age, bio });
}

#[query]
fn get_profile(user_id: String) -> Option<UserProfile> {
    let profiles = unsafe { PROFILES.as_ref()? };
    profiles.get(&user_id).cloned()
}
"#.to_string()),

        // Additional entries...

    ].into_iter().collect();
    
    let result = check_key_in_input(input, &rust_code_dict);
    return result;
}

