// src/GainChain_backend/controllers/testimonial_controller.rs
use crate::services::testimonial_service::{add_testimonial, get_testimonials};
use crate::models::testimonial_model::Testimonial;

pub fn create_testimonial(user_id: &str, content: &str) -> Testimonial {
    add_testimonial(user_id, content)
}

pub fn list_testimonials() -> Vec<Testimonial> {
    get_testimonials()
}
