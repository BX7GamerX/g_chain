#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

use reqwest::Client;
use ic_cdk_macros::update;
use serde_json::Value;
use std::error::Error;

#[update]
async fn generate_code(description: String, language: String) -> String {
    let client = Client::new();
    let api_url = "http://127.0.0.1:5000/generate_code"; // Flask server endpoint

    // Prepare the JSON payload for the POST request
    let payload = serde_json::json!({
        "description": description,
        "language": language,
    });

    // Send the POST request to the Python backend and await the response
    let response = client.post(api_url)
        .json(&payload)
        .send()
        .await;

    // Process the response
    match response {
        Ok(resp) => {
            // Check if the status is success and parse JSON response
            if resp.status().is_success() {
                match resp.json::<Value>().await {
                    Ok(json) => {
                        // Extract the generated code from the JSON response
                        if let Some(code) = json.get("code").and_then(|v| v.as_str()) {
                            code.to_string()
                        } else {
                            "Error: Code generation response missing 'code' field.".to_string()
                        }
                    }
                    Err(_) => "Error parsing JSON response".to_string(),
                }
            } else {
                format!("Error: Received non-success status code {}", resp.status())
            }
        }
        Err(_) => "Error making request to the code generation service".to_string(),
    }
}