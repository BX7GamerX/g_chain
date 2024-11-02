use crate::models::post::Post;
use ic_cdk::{caller, api::time};
use candid::Principal;
use std::collections::HashMap;
use std::cell::RefCell;

thread_local! {
    static POSTS: RefCell<HashMap<u64, Post>> = RefCell::new(HashMap::new());
}

// Function to create a new post
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

// Function to retrieve a post
pub fn get_post(post_id: u64) -> Option<Post> {
    POSTS.with(|posts| posts.borrow().get(&post_id).cloned())
}

// Function for liking a post
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
