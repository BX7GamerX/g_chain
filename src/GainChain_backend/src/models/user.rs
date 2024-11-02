use candid::{CandidType, Principal};  // Updated import for candid
use serde::{Deserialize, Serialize};   // Serde for serialization and deserialization

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct User {
    pub id: Principal,                // Unique identifier for the user
    pub username: String,             // Username of the user
    pub bio: Option<String>,          // Optional bio of the user
    pub followers: Vec<Principal>,    // List of Principals who follow this user
    pub following: Vec<Principal>,    // List of Principals this user is following
    pub created_at: u64,              // Timestamp for when the user was created
}

impl User {
    /// Creates a new user with the provided information.
    pub fn new(id: Principal, username: String, bio: Option<String>, created_at: u64) -> Self {
        User {
            id,
            username,
            bio,
            followers: Vec::new(),    // Initialize with no followers
            following: Vec::new(),    // Initialize with no following
            created_at,
        }
    }

    /// Adds a follower to this user.
    pub fn add_follower(&mut self, follower_id: Principal) {
        if !self.followers.contains(&follower_id) {
            self.followers.push(follower_id);
        }
    }

    /// Removes a follower from this user.
    pub fn remove_follower(&mut self, follower_id: Principal) {
        if let Some(index) = self.followers.iter().position(|x| *x == follower_id) {
            self.followers.remove(index);
        }
    }

    /// Adds a user to this user's following list.
    pub fn follow_user(&mut self, user_id: Principal) {
        if !self.following.contains(&user_id) {
            self.following.push(user_id);
        }
    }

    /// Removes a user from this user's following list.
    pub fn unfollow_user(&mut self, user_id: Principal) {
        if let Some(index) = self.following.iter().position(|x| *x == user_id) {
            self.following.remove(index);
        }
    }

    /// Returns the count of followers.
    pub fn follower_count(&self) -> usize {
        self.followers.len()
    }

    /// Returns the count of following.
    pub fn following_count(&self) -> usize {
        self.following.len()
    }
}
