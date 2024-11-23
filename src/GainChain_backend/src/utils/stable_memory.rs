use ic_cdk::api::stable::{stable_bytes, stable_read, stable_write};
use candid::{CandidType, Decode, Encode};

pub fn save_to_stable_memory<T: CandidType>(key: &str, value: &T) {
    let data = Encode!(value).expect("Failed to encode data");
    let key_bytes = key.as_bytes();
    let mut buffer = key_bytes.to_vec();
    buffer.push(0); // Null terminator
    buffer.extend(data);

    stable_write(0, &buffer).expect("Failed to write to stable memory");
}

pub fn load_from_stable_memory<T: Decode>(key: &str) -> Option<T> {
    let data = stable_bytes();
    let key_bytes = key.as_bytes();
    if data.starts_with(key_bytes) && data[key_bytes.len()] == 0 {
        Decode!(&data[key_bytes.len() + 1..], T).ok()
    } else {
        None
    }
}
