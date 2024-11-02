#[cfg(test)]
mod integration_tests {
    use super::services::{user_service, post_service};
    use ic_cdk::export::Principal;

    #[test]
    fn test_user_follow_and_post_interaction() {
        let user_id_1 = Principal::anonymous();
        let user_id_2 = Principal::management_canister();

        user_service::create_user("Alice".to_string(), None);
        user_service::create_user("Bob".to_string(), None);

        let follow_result = user_service::follow_user(user_id_2);
        assert!(follow_result.contains("is now following"));

        post_service::create_post("Hello World!".to_string(), None);
        let post_id = time() as u64;
        let like_result = post_service::like_post(post_id);
        assert!(like_result.contains("liked by user"));
    }
}
