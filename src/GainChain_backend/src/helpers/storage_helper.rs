// src/GainChain_backend/helpers/storage_helper.rs
use std::fs::{self, OpenOptions};
use std::io::{Read, Write};
use serde::{Serialize, de::DeserializeOwned};
use std::path::Path;

pub fn save_to_file<T: Serialize>(data: &T, file_path: &str) -> std::io::Result<()> {
    let file = OpenOptions::new().create(true).write(true).truncate(true).open(file_path)?;
    serde_json::to_writer(file, data)?;
    Ok(())
}

pub fn load_from_file<T: DeserializeOwned>(file_path: &str) -> std::io::Result<T> {
    if !Path::new(file_path).exists() {
        return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "File not found"));
    }

    let mut file = OpenOptions::new().read(true).open(file_path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let data = serde_json::from_str(&contents)?;
    Ok(data)
}
