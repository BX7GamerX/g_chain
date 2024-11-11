// src/GainChain_backend/services/settings_service.rs
use crate::models::settings_model::Settings;
use crate::helpers::storage_helper::{save_to_file, load_from_file};

const SETTINGS_DATA_FILE: &str = "data/settings.json";

pub fn update_settings(user_id: &str, dark_mode: bool, font_size: u8) -> Settings {
    let setting = Settings {
        user_id: user_id.to_string(),
        dark_mode,
        font_size,
    };

    let mut settings = load_all_settings();
    settings.retain(|s| s.user_id != user_id);  // Remove any existing setting for the user
    settings.push(setting.clone());
    save_to_file(&settings, SETTINGS_DATA_FILE).expect("Failed to save settings");

    setting
}

pub fn get_user_settings(user_id: &str) -> Settings {
    let settings = load_all_settings();
    settings.into_iter().find(|s| s.user_id == user_id).unwrap_or(Settings {
        user_id: user_id.to_string(),
        dark_mode: false,
        font_size: 12,
    })
}

fn load_all_settings() -> Vec<Settings> {
    load_from_file(SETTINGS_DATA_FILE).unwrap_or_else(|_| vec![])
}
