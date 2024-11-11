use ic_cdk_macros::query;
#[query]
pub fn greet(name: String) -> String {
    //let user_data = json!([0.5, 0.8, 0.3]); // Example data for recommendation


    format!("Hello, {}", name)
}

