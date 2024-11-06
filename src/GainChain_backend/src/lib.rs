mod gen_ai;
use gen_ai::generate_code as ai_generate_code;  // Rename the imported function to avoid conflicts

#[ic_cdk::query]
fn greet(name: String) -> String {
    let code = ai_generate_code("Write a code for a canister that stores the user-profile");
    format!("Hello, {}!\nGenerated code:\n{}", name, code)
}

#[ic_cdk::query]
fn generate_code(prompt: String) -> String {
    ai_generate_code(&prompt)  // Directly return the result from ai_generate_code
}
