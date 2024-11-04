// This module contains functions for creating and managing posts on the social network.
// The posts are stored in a thread-local hashmap, where the key is the post ID and the value is the Post struct.
//
// The Post struct contains the post author, content, media URL, likes, and creation time.

use crate::models::post::Post;  // Import the Post struct from the models module
use ic_cdk::{  // Import the IC CDK library
    caller,  // A function that returns the ID of the current caller
    api::time,  // A function that returns the current time in nanoseconds
};
use candid::Principal;  // Import the Principal type from the Candid library
use std::collections::HashMap;  // Import the HashMap struct from the standard library
use std::cell::RefCell;  // Import the RefCell struct from the standard library, which is used to create a thread-local hashmap.

thread_local! {
    static POSTS: RefCell<HashMap<u64, Post>> = RefCell::new(HashMap::new());
}


/// Creates a new post with the provided information.
///
/// # Arguments
///
/// * `content` - String content of the post.
/// * `media_url` - Optional media URL associated with the post.
///
/// # Returns
///
/// * `Post` - The newly created post.
pub fn create_post(content: String, media_url: Option<String>) -> Post {
    let post_id = time() as u64;  // Using timestamp as unique post ID
    let author = caller();

    let new_post = Post {
        id: post_id,
        author,
        content,
        media_url,
        likes: Vec::new(),
        created_at: time(),
    };

    POSTS.with(|posts| posts.borrow_mut().insert(post_id, new_post.clone()));
    new_post
}


/// Retrieves a post by its unique post ID.
///
/// # Arguments
///
/// * `post_id` - A 64-bit unsigned integer representing the unique identifier of the post.
///
/// # Returns
///
/// * `Option<Post>` - Returns `Some(Post)` if the post is found, otherwise `None`.
pub fn get_post(post_id: u64) -> Option<Post> {
    // Access the POSTS thread-local storage
    POSTS.with(|posts| {
        // Attempt to get the post from the hashmap and return a cloned instance if found
        posts.borrow().get(&post_id).cloned()
    })
}

/// Like a post with the given `post_id`. Returns an error if the post doesn't exist
/// or if the user has already liked the post.
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
        // Post not found
        format!("Post {} not found", post_id)
    })
}

/**********************************---test----------------****************************/
#[cfg(test)]
mod tests {
    use super::*;
    use candid::Principal;
    use std::str::FromStr;
    use ic_cdk::api::set_time;

    #[test]
    fn test_create_post() {
        let content = String::from("This is a test post.");
        let media_url = Some(String::from("http://example.com/image.png"));

        // Set a consistent time for testing
        set_time(1_638_400_000);
        let result_post = create_post(content.clone(), media_url.clone());
        assert_eq!(result_post.content, content);
        assert_eq!(result_post.media_url, media_url);
        assert_eq!(result_post.id, 1_638_400_000);

        let post = get_post(result_post.id).unwrap();
        assert_eq!(post.content, content);
        assert_eq!(post.media_url, media_url);
    }

    #[test]
    fn test_like_post() {
        let content = String::from("Likeable post");

        // Set a consistent time and create a post
        set_time(1_638_400_000);
        let new_post = create_post(content, None);
        let post_id = new_post.id;

        let principal = Principal::from_str("w7x7r-cok77-xa").unwrap();
        ic_cdk::set_caller(principal); // Set caller for testing
        let result = like_post(post_id);
        assert_eq!(result, format!("Post {} liked by user {}", post_id, principal));

        let post = get_post(post_id).unwrap();
        assert!(post.likes.contains(&principal));
    }
}
