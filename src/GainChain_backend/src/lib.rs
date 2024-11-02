use candid::CandidType;
use serde::{Deserialize, Serialize};  // Serde is now correctly imported
use candid::Principal;  // Correct import for Principal
mod neural_network;
use neural_network::NeuralNetwork;
//******************************************************************************************************* */

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
struct Contract {
    id: u64,
    name: String,
    owner: Principal,
    data: Vec<u8>,
}

// Has to store the canister
use std::collections::HashMap;

thread_local! {
    static CONTRACTS: std::cell::RefCell<HashMap<u64, Contract>> = std::cell::RefCell::new(HashMap::new());
}

// Generate new contracts 
#[ic_cdk::update]
fn create_contract(id: u64, name: String, data: Vec<u8>) -> String {
    let owner = ic_cdk::caller;// caller();  // Get the principal (identity) of the caller
    let contract = Contract::new(id, name, owner(), data);

    CONTRACTS.with(|contracts| {
        contracts.borrow_mut().insert(id, contract);
    });

    format!("Contract with id {} created successfully.", id)
}

// Retrieve contract by ID
#[ic_cdk::query]
fn get_contract(id: u64) -> Option<Contract> {
    CONTRACTS.with(|contracts| {
        contracts.borrow().get(&id).cloned()
    })
}

impl Contract {
    fn new(id: u64, name: String, owner: Principal, data: Vec<u8>) -> Self {
        Contract { id, name, owner, data }
    }
}
use serde_json::json;
// A simple greeting function
#[ic_cdk::query]
fn greet(name: String) -> String {
    let nn = NeuralNetwork::new(3, 4, 2, 0.01);
        let user_data = json!([0.5, -0.1, 0.3]);
        let recommendations = nn.generate_recommendations(&user_data);
    format!("Hello, {}!\n{}", name, recommendations)
}
