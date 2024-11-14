
use ic_cdk_macros::query;

/// Example query function that greets the user and provides recommendations
#[query]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name, )
}
