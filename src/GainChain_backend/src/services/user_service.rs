// This module contains functions for managing users in the system.
//
// It uses a thread-local store to keep track of all users.
//
// # Safety
//
// This module is not thread-safe, so it is not safe to access it from multiple threads.
use crate::models::user::User;
use ic_cdk::{caller, api::time};
use candid::Principal;
use std::collections::HashMap;
use std::cell::RefCell;

/// A thread-local store of all users.
///
/// This is used to keep track of all users in the system.
///
/// # Safety
///
/// This is a thread-local store, so it is not safe to access it from multiple threads.
thread_local! {
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::new(HashMap::new());
}


/// Create a new user.
///
/// # Arguments
///
/// * `username` - The username for the new user.
/// * `bio` - An optional bio for the new user.
///
/// # Returns
///
/// The newly created `User`.
pub fn create_user(username: String, bio: Option<String>) -> User {
    let user_id = caller();
    let new_user = User {
        id: user_id,
        username,
        bio,
        followers: Vec::new(),
        following: Vec::new(),
        created_at: time(),
    };

    USERS.with(|users| users.borrow_mut().insert(user_id, new_user.clone()));
    new_user
}

/// Retrieve a user by their `Principal` ID.
///
/// # Arguments
///
/// * `user_id` - The `Principal` ID of the user to retrieve.
///
/// # Returns
///
/// An `Option<User>` containing the retrieved user, or `None` if no user is found.
pub fn get_user(user_id: Principal) -> Option<User> {
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}


/// Allows the current user to follow another user.
///
/// # Arguments
///
/// * `target_user_id` - The `Principal` ID of the user to be followed.
///
/// # Returns
///
/// A `String` message indicating the result of the follow operation.
pub fn follow_user(target_user_id: Principal) -> String {
    let user_id = caller(); // Get the ID of the current user
    if user_id == target_user_id {
        // Check if the user is trying to follow themselves
        return "Users cannot follow themselves.".to_string();
    }

    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if let Some(target_user) = users.get_mut(&target_user_id) {
            // Check if the target user exists
            if !target_user.followers.contains(&user_id) {
                // If not already following, add the current user to the target's followers
                target_user.followers.push(user_id);
                if let Some(current_user) = users.get_mut(&user_id) {
                    // Add the target user to the current user's following list
                    current_user.following.push(target_user_id);
                }
                format!("User {} is now following {}", user_id, target_user_id)
            } else {
                format!("User {} is already following {}", user_id, target_user_id)
            }
        } else {
            format!("User {} not found", target_user_id) // Target user doesn't exist
        }
    })
}

/*********************************************************---tests---*************************************************************/
#[cfg(test)]
mod tests {
    use super::*;
    use candid::Principal;
    use ic_cdk::api::set_time;
    use ic_cdk::set_caller;

    #[test]
    fn test_create_user() {
        let user_id = Principal::anonymous();
        let username = String::from("test_user");
        let bio = Some(String::from("A test user bio."));
        
        // Set the caller for testing purposes
        set_caller(user_id);
        let result_user = create_user(username.clone(), bio.clone());
        
        // Assert that the function created the user correctly
        assert_eq!(result_user.username, username);
        assert_eq!(result_user.bio, bio);

        let user = get_user(user_id).unwrap();
        assert_eq!(user.username, username);
        assert_eq!(user.bio, bio);
    }

    #[test]
    fn test_follow_user() {
        let user_id = Principal::anonymous();
        let target_user_id = Principal::management_canister();

        // Set the caller and create users for the test
        set_caller(user_id);
        create_user(String::from("user1"), None);
        set_caller(target_user_id);
        create_user(String::from("user2"), None);

        set_caller(user_id);  // Set caller to the first user
        let result = follow_user(target_user_id);
        assert_eq!(result, format!("User {} is now following {}", user_id, target_user_id));

        // Verify that the follow relationship is correctly established
        let user = get_user(user_id).unwrap();
        assert!(user.following.contains(&target_user_id));

        let target_user = get_user(target_user_id).unwrap();
        assert!(target_user.followers.contains(&user_id));
    }
}
