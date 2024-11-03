
use serde_json::{json, Value};
use std::f64::consts::E;

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
    /// Initializes the neural network with random weights
    pub fn new(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) -> Self {
        // Hard-coded weights for the input to hidden layer
        let weights_input_hidden: Vec<Vec<f64>> = vec![
            vec![0.1, -0.2], // Example weights for the first input to hidden neurons
            vec![0.4, 0.5],  // Example weights for the second input to hidden neurons
            // Add more rows according to input_size and hidden_size
        ];

        // Hard-coded weights for the hidden to output layer
        let weights_hidden_output: Vec<Vec<f64>> = vec![
            vec![0.3], // Example weights from hidden neurons to output
            vec![-0.1],
            // Add more rows according to hidden_size and output_size
        ];


        Self {
            input_size,
            hidden_size,
            output_size,
            learning_rate,
            weights_input_hidden,
            weights_hidden_output,
        }
    }

    /// Forward pass to compute output with softmax activation
    pub fn forward(&self, input_data: &[f64]) -> Vec<f64> {
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

    /// ReLU activation function
    fn relu(x: f64) -> f64 {
        x.max(0.0)
    }

    /// Softmax activation function for output layer
    fn softmax(input: &[f64]) -> Vec<f64> {
        let exp_values: Vec<f64> = input.iter().map(|&x| E.powf(x)).collect();
        let sum: f64 = exp_values.iter().sum();
        exp_values.iter().map(|&x| x / sum).collect()
    }

    /// Generate recommendations based on user data in JSON format
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
}
