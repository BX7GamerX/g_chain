// src/services/neural_net_service.rs

use serde_json::Value;

pub struct ProjectRecommendation {
    pub id: u32,
    pub score: f64,
}

pub fn recommend_posts(user_data: &Value) -> Vec<ProjectRecommendation> {
    vec![
        ProjectRecommendation { id: 1, score: 0.95 },
        ProjectRecommendation { id: 2, score: 0.88 },
        ProjectRecommendation { id: 3, score: 0.76 },
    ]
}
