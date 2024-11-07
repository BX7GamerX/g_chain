
// The services module contains the implementations of the different services
// that are exposed by the canister. Each service is responsible for a specific
// set of operations and is the entry point for the canister's API.

// The wallet service is responsible for managing the user's wallet and
// performing operations on it such as adding or removing funds.

// The wallet module contains the implementation of the wallet service.
use std::collections::HashMap;
use ic_cdk::api::caller;
use candid::{Nat, Principal};
use serde::{Deserialize, Serialize};

/// Represents a user's wallet.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Wallet {
    /// The wallet's balance in ICP.
    balance: Nat,  // Using Nat to store balance
}
impl Wallet {
    /// Creates a new wallet with a zero balance.
    pub fn new() -> Self {
        Self { balance: Nat::from(0u64) }
    }

    /// Returns a reference to the wallet's balance.
    pub fn get_balance(&self) -> &Nat {
        &self.balance
    }

    /// Adds the specified amount to the wallet's balance.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount of coins to add to the wallet.
    pub fn earn(&mut self, amount: Nat) {
        self.balance += amount;
    }

    /// Attempts to send the specified amount from the wallet's balance.
    ///
    /// Returns an error if the balance is insufficient.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount of coins to send.
    pub fn send(&mut self, amount: Nat) -> Result<(), String> {
        if self.balance < amount {
            return Err("Insufficient balance for transfer.".to_string());
        }
        self.balance -= amount;
        Ok(())
    }

    /// Receives the specified amount, adding it to the wallet's balance.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount of coins received.
    pub fn receive(&mut self, amount: Nat) {
        self.balance += amount;
    }
}

thread_local! {
    /// A mapping from user principals to their wallets.
    static WALLETS: std::cell::RefCell<HashMap<Principal, Wallet>> = std::cell::RefCell::new(HashMap::new());
}

/// Returns the balance of the caller's wallet.
///
/// # Returns
///
/// The balance of the caller's wallet. If the caller does not have a wallet, the
/// function returns 0.
pub fn get_balance() -> Nat {
    WALLETS.with(|wallets| {
        let wallets = wallets.borrow();
        // Get the caller's wallet, or return 0 if none exists.
        wallets.get(&caller()).map(|wallet| wallet.get_balance().clone()).unwrap_or_else(|| Nat::from(0u64))
    })
}

/// Adds coins to the caller's wallet and returns the updated balance.
///
/// # Arguments
///
/// * `amount` - The amount of coins to be added to the wallet.
pub fn earn_coins(amount: Nat) -> Nat {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();
        // Access or create the caller's wallet.
        let wallet = wallets.entry(caller()).or_insert_with(Wallet::new);
        // Add the specified amount to the wallet.
        wallet.earn(amount.clone());
        // Return the updated balance.
        wallet.get_balance().clone()
    })
}


/// Transfers coins from the sender's wallet to the recipient's wallet.
///
/// Returns an error message if the sender does not have enough balance.
pub fn send_coins(sender_id: Principal, recipient_id: Principal, amount: Nat) -> Result<String, String> {
    WALLETS.with(|wallets| {
        let mut wallets = wallets.borrow_mut();

        let sender_wallet = wallets.entry(sender_id).or_insert_with(Wallet::new);
        // Make sure the sender has enough balance.
        sender_wallet.send(amount.clone())?;

        let recipient_wallet = wallets.entry(recipient_id.clone()).or_insert_with(Wallet::new);
        // Add the coins to the recipient's wallet.
        recipient_wallet.receive(amount.clone());

        // Return a success message indicating the amount sent.
        Ok(format!("Sent {} coins to {}", amount, recipient_id))
    })
}


