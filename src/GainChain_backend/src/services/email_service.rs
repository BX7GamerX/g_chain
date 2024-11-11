// src/services/email_service.rs

pub fn send_email(to: &str, subject: &str, body: &str) -> Result<(), String> {
    ic_cdk::println!("Sending email to {}: {}", to, subject);
    // Placeholder for integration with an email API
    Ok(())
}
