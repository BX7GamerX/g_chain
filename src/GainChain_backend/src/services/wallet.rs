// services/wallet.rs

use std::collections::HashMap;
use ic_cdk::api::caller;
use candid::{Nat, Principal};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Wallet {
    balance: Nat,  // Using Nat to store balance
}

impl Wallet {
    pub fn new() -> Self {
        Self { balance: Nat::from(0u64) }
    }

    pub fn get_balance(&self) -> &Nat {
        &self.balance
    }

    pub fn earn(&mut self, amount: Nat) {
        self.balance += amount;
    }

    pub fn send(&mut self, amount: Nat) -> Result<(), String> {
        if self.balance < amount {
            return Err("Insufficient balance for transfer.".to_string());
        }
        self.balance -= amount;
        Ok(())
    }

    pub fn receive(&mut self, amount: Nat) {
        self.balance += amount;
    }
}

thread_local! {
    static WALLETS: std::cell::RefCell<HashMap<Principal, Wallet>> = std::cell::RefCell::new(HashMap::new());
}

/// Returns the balance of the caller's wallet
pub fn get_balance() -> Nat {
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        wallets.get(&caller()).map(|wallet| wallet.get_balance().clone()).unwrap_or_else(|| Nat::from(0u64))
    })
}

/// Adds coins to the caller's wallet
pub fn earn_coins(amount: Nat) -> Nat {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        let wallet = wallets.entry(caller()).or_insert_with(Wallet::new);
        wallet.earn(amount.clone());
        wallet.get_balance().clone()
    })
}


pub fn send_coins(sender_id: Principal, recipient_id: Principal, amount: Nat) -> Result<String, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();

        let sender_wallet = wallets.entry(sender_id).or_insert_with(Wallet::new);
        sender_wallet.send(amount.clone())?;

        let recipient_wallet = wallets.entry(recipient_id.clone()).or_insert_with(Wallet::new);
        recipient_wallet.receive(amount.clone());

        Ok(format!("Sent {} coins to {}", amount, recipient_id))
    })
}






/*use std::collections::HashMap;
use ic_cdk::api::caller;
use candid::Principal;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Wallet {
    balance: u64,  // Balance is stored as an unsigned integer (in-app currency units)
}

impl Wallet {
    /// Creates a new wallet with an initial balance of 0
    pub fn new() -> Self {
        Self { balance: 0 }
    }

    /// Returns the current balance of the wallet
    pub fn get_balance(&self) -> u64 {
        self.balance
    }

    /// Increases the wallet balance by a specified amount (e.g., for receiving coins from likes)
    pub fn earn(&mut self, amount: u64) {
        self.balance += amount;
    }

    /// Transfers coins from this wallet to another user's wallet
    pub fn send(&mut self, recipient: &mut Wallet, amount: u64) -> Result<(), String> {
        if self.balance < amount {
            return Err("Insufficient balance for transfer.".to_string());
        }
        self.balance -= amount;
        recipient.balance += amount;
        Ok(())
    }
}

/// Thread-local storage for user wallets
thread_local! {
    static WALLETS: std::cell::RefCell<HashMap<Principal, Wallet>> = std::cell::RefCell::new(HashMap::new());
}

/// Gets or initializes the caller's wallet
pub fn get_wallet() -> Wallet {
    let user_id = caller();
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        wallets.entry(user_id).or_insert_with(Wallet::new).clone()
    })
}
/************ */
use ic_cdk_macros::query;
use candid::Nat;
/********* */ 
/// Retrieves the caller's current balance
pub fn get_balance() -> u64 {
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        wallets.get(&caller()).map(|wallet| wallet.get_balance()).unwrap_or(0)
    })
}

/// Adds coins to the caller's wallet
pub fn earn_coins(amount: u64) -> u64 {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        let wallet = wallets.entry(caller()).or_insert_with(Wallet::new);
        wallet.earn(amount);
        wallet.get_balance()
    })
}

/// Sends coins from the caller's wallet to a recipient's wallet
pub fn send_coins(recipient_id: Principal, amount: u64) -> Result<String, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        // First, get a mutable reference for the sender's wallet
    let mut sender_wallet = wallets.entry(caller()).or_insert_with(Wallet::new).clone();

// Then, get a separate mutable reference for the recipient's wallet
    let mut recipient_wallet = wallets.entry(recipient_id.clone()).or_insert_with(Wallet::new).clone();

// Now, apply the send function
    sender_wallet.send(&mut recipient_wallet, amount)?;

        Ok(format!("Sent {} coins to {}", amount, recipient_id))
    })
}
*/