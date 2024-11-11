// src/GainChain_backend/services/testimonial_service.rs
use crate::models::testimonial_model::Testimonial;
use uuid::Uuid;
use std::time::{SystemTime, UNIX_EPOCH};

pub fn add_testimonial(user_id: &str, content: &str) -> Testimonial {
    Testimonial {
        id: Uuid::new_v4().to_string(),
        user_id: user_id.to_string(),
        content: content.to_string(),
        timestamp: SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .expect("Time went backwards")
            .as_secs(),
    }
}

// Placeholder for fetching testimonials (can implement actual data storage later)
pub fn get_testimonials() -> Vec<Testimonial> {
    vec![]
}
