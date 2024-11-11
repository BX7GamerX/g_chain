// src/GainChain_backend/controllers/settings_controller.rs
use crate::services::settings_service::{update_settings, get_user_settings};
use crate::models::settings_model::Settings;

pub fn set_user_settings(user_id: &str, dark_mode: bool, font_size: u8) -> Settings {
    update_settings(user_id, dark_mode, font_size)
}

pub fn get_settings(user_id: &str) -> Settings {
    get_user_settings(user_id)
}
