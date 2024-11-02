use candid::{CandidType, Principal};  // Updated import for candid
use serde::{Deserialize, Serialize};  // Serde for serialization and deserialization

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Post {
    pub id: u64,
    pub author: Principal,         // The author's Principal (unique identifier)
    pub content: String,           // Content of the post
    pub media_url: Option<String>, // Optional media URL
    pub likes: Vec<Principal>,     // List of Principals who liked the post
    pub created_at: u64,           // Timestamp for when the post was created
}

impl Post {
    /// Creates a new post with the provided information.
    pub fn new(id: u64, author: Principal, content: String, media_url: Option<String>, created_at: u64) -> Self {
        Post {
            id,
            author,
            content,
            media_url,
            likes: Vec::new(),  // Initialize with no likes
            created_at,
        }
    }

    /// Adds a like from a user to this post.
    pub fn add_like(&mut self, user: Principal) {
        if !self.likes.contains(&user) {
            self.likes.push(user);
        }
    }

    /// Removes a like from a user for this post.
    pub fn remove_like(&mut self, user: Principal) {
        if let Some(index) = self.likes.iter().position(|x| *x == user) {
            self.likes.remove(index);
        }
    }

    /// Returns the total number of likes.
    pub fn like_count(&self) -> usize {
        self.likes.len()
    }
}
