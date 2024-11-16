use serde_json::{json, Value};
use std::f64::consts::E;
use ic_cdk::api::time;

/// Represents a neural network with a single hidden layer.
pub struct NeuralNetwork {
    pub input_size: usize,
    pub hidden_size: usize,
    pub output_size: usize,
    pub learning_rate: f64,
    pub weights_input_hidden: Vec<Vec<f64>>,
    pub weights_hidden_output: Vec<Vec<f64>>,
}

impl NeuralNetwork {
    fn ic_random_f64(seed: u64) -> f64 {
        let nanos = time();
        let pseudo_random = nanos.wrapping_add(seed);
        (pseudo_random % 1000) as f64 / 1000.0
    }

    pub fn new(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) -> Self {
        let mut weights_input_hidden = vec![vec![0.0; hidden_size]; input_size];
        let mut weights_hidden_output = vec![vec![0.0; output_size]; hidden_size];

        for i in 0..input_size {
            for j in 0..hidden_size {
                weights_input_hidden[i][j] = Self::ic_random_f64((i * hidden_size + j) as u64);
            }
        }

        for j in 0..hidden_size {
            for k in 0..output_size {
                weights_hidden_output[j][k] = Self::ic_random_f64((j * output_size + k) as u64);
            }
        }

        Self {
            input_size,
            hidden_size,
            output_size,
            learning_rate,
            weights_input_hidden,
            weights_hidden_output,
        }
    }

    pub fn generate_recommendations(&self, user_data: &Value) -> Value {
        let input_data: Vec<f64> = user_data.as_array()
            .expect("User data should be an array of numbers")
            .iter()
            .map(|v| v.as_f64().expect("Expected a floating-point number"))
            .collect();

        let output = self.forward(&input_data);

        let recommendations = output.iter()
            .enumerate()
            .map(|(i, &score)| json!({ "item_id": i, "score": score }))
            .collect::<Vec<_>>();

        json!({ "recommendations": recommendations })
    }

    fn forward(&self, input_data: &[f64]) -> Vec<f64> {
        let hidden_layer: Vec<f64> = (0..self.hidden_size)
            .map(|j| {
                let sum: f64 = self.weights_input_hidden.iter()
                    .zip(input_data)
                    .map(|(weights, &input)| weights[j] * input)
                    .sum();
                Self::relu(sum)
            })
            .collect();

        let output_layer: Vec<f64> = (0..self.output_size)
            .map(|k| {
                let sum: f64 = self.weights_hidden_output.iter()
                    .zip(&hidden_layer)
                    .map(|(weights, &hidden)| weights[k] * hidden)
                    .sum();
                sum
            })
            .collect();

        Self::softmax(&output_layer)
    }

    fn relu(x: f64) -> f64 {
        x.max(0.0)
    }

    fn softmax(input: &[f64]) -> Vec<f64> {
        let exp_values: Vec<f64> = input.iter().map(|&x| E.powf(x)).collect();
        let sum: f64 = exp_values.iter().sum();
        exp_values.iter().map(|&x| x / sum).collect()
    }
    /// Generates backend support for user projects, creating configurations as JSON
    pub fn generate_user_project_support(&self, user_data: &Value) -> Value {
        let input_data: Vec<f64> = user_data.as_array()
            .expect("User data should be an array of numbers")
            .iter()
            .map(|v| v.as_f64().expect("Expected a floating-point number"))
            .collect();
    
        let output = self.forward(&input_data);
    
        let project_support = output.iter()
            .enumerate()
            .map(|(i, &score)| json!({ "config_id": i, "config_score": score }))
            .collect::<Vec<_>>();
    
        json!({ "project_support": project_support })
    }
    
}
