// Imports
use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk::export::Principal;
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

// Define core data models

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct User {
    pub id: Principal,        // Unique user ID
    pub username: String,     // Display name
    pub bio: Option<String>,  // Optional bio
    pub followers: Vec<Principal>,  // List of followers
    pub following: Vec<Principal>,  // List of users this user follows
    pub created_at: u64,      // Timestamp of account creation
}

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct Post {
    pub id: u64,              // Unique post ID
    pub author: Principal,    // Author ID
    pub content: String,      // Text content of the post
    pub media_url: Option<String>, // Optional media content
    pub likes: Vec<Principal>,     // List of users who liked the post
    pub created_at: u64,      // Timestamp of post creation
}

#[derive(Clone, Debug, CandidType, Serialize, Deserialize)]
pub struct Comment {
    pub id: u64,
    pub post_id: u64,
    pub author: Principal,
    pub content: String,
    pub created_at: u64,
}
use std::cell::RefCell;

thread_local! {
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::new(HashMap::new());
    static POSTS: RefCell<HashMap<u64, Post>> = RefCell::new(HashMap::new());
    static COMMENTS: RefCell<HashMap<u64, Comment>> = RefCell::new(HashMap::new());
}
use ic_cdk::caller;

// Create a new user
#[ic_cdk::update]
pub fn create_user(username: String, bio: Option<String>) -> String {
    let user_id = caller();
    let new_user = User {
        id: user_id,
        username,
        bio,
        followers: Vec::new(),
        following: Vec::new(),
        created_at: ic_cdk::api::time(),
    };

    USERS.with(|users| users.borrow_mut().insert(user_id, new_user));
    format!("User {} created successfully", user_id)
}

// Retrieve user details
#[ic_cdk::query]
pub fn get_user(user_id: Principal) -> Option<User> {
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}
// Create a new post
#[ic_cdk::update]
pub fn create_post(content: String, media_url: Option<String>) -> String {
    let post_id = ic_cdk::api::time() as u64;  // Using timestamp as unique post ID
    let author = caller();
    
    let new_post = Post {
        id: post_id,
        author,
        content,
        media_url,
        likes: Vec::new(),
        created_at: ic_cdk::api::time(),
    };

    POSTS.with(|posts| posts.borrow_mut().insert(post_id, new_post));
    format!("Post {} created successfully", post_id)
}

// Retrieve a post
#[ic_cdk::query]
pub fn get_post(post_id: u64) -> Option<Post> {
    POSTS.with(|posts| posts.borrow().get(&post_id).cloned())
}
#[ic_cdk::update]
pub fn like_post(post_id: u64) -> String {
    let user_id = caller();
    POSTS.with(|posts| {
        let mut posts = posts.borrow_mut();
        if let Some(post) = posts.get_mut(&post_id) {
            if !post.likes.contains(&user_id) {
                post.likes.push(user_id);
                return format!("Post {} liked by user {}", post_id, user_id);
            } else {
                return format!("User {} already liked post {}", user_id, post_id);
            }
        }
        format!("Post {} not found", post_id)
    })
}
#[ic_cdk::update]
pub fn follow_user(target_user_id: Principal) -> String {
    let user_id = caller();
    if user_id == target_user_id {
        return "Users cannot follow themselves.".to_string();
    }
    
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if let Some(target_user) = users.get_mut(&target_user_id) {
            if !target_user.followers.contains(&user_id) {
                target_user.followers.push(user_id);
                if let Some(current_user) = users.get_mut(&user_id) {
                    current_user.following.push(target_user_id);
                }
                format!("User {} is now following {}", user_id, target_user_id)
            } else {
                format!("User {} is already following {}", user_id, target_user_id)
            }
        } else {
            format!("User {} not found", target_user_id)
        }
    })
}
#[cfg(test)]
mod tests {
    use super::*;
    use ic_cdk::export::Principal;

    #[test]
    fn test_create_user() {
        let user_id = Principal::from_text("aaaaa-aa").unwrap();
        ic_cdk::api::set_caller(user_id);
        
        assert_eq!(create_user("TestUser".to_string(), None), "User aaaaa-aa created successfully");
        assert!(get_user(user_id).is_some());
    }

    #[test]
    fn test_create_post() {
        let author_id = Principal::from_text("aaaaa-aa").unwrap();
        ic_cdk::api::set_caller(author_id);

        assert_eq!(create_post("Hello, world!".to_string(), None), "Post 123456789 created successfully");  // Adjust ID as necessary
        assert!(get_post(123456789).is_some());
    }

    #[test]
    fn test_like_post() {
        let author_id = Principal::from_text("aaaaa-aa").unwrap();
        let liker_id = Principal::from_text("bbbbb-bb").unwrap();
        ic_cdk::api::set_caller(author_id);

        create_post("Test Post".to_string(), None);
        ic_cdk::api::set_caller(liker_id);
        
        assert_eq!(like_post(123456789), "Post 123456789 liked by user bbbbb-bb");
    }

    #[test]
    fn test_follow_user() {
        let user1 = Principal::from_text("aaaaa-aa").unwrap();
        let user2 = Principal::from_text("bbbbb-bb").unwrap();

        ic_cdk::api::set_caller(user1);
        create_user("User1".to_string(), None);

        ic_cdk::api::set_caller(user2);
        create_user("User2".to_string(), None);

        assert_eq!(follow_user(user1), "User bbbbb-bb is now following aaaaa-aa");
    }
}
