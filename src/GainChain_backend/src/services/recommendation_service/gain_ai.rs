use rand::Rng;
use serde_json::Value;
use serde_json::json;
use std::f64::consts::E;

/// Represents a neural network with a single hidden layer.
pub struct NeuralNetwork {
    /// Input layer size
    pub input_size: usize,
    /// Hidden layer size
    pub hidden_size: usize,
    /// Output layer size
    pub output_size: usize,
    /// Learning rate for weight updates
    pub learning_rate: f64,
    /// Weights between input and hidden layers
    pub weights_input_hidden: Vec<Vec<f64>>,
    /// Weights between hidden and output layers
    pub weights_hidden_output: Vec<Vec<f64>>,
}

impl NeuralNetwork {
    /// Initialize the neural network with random weights
    pub fn new(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) -> Self {
        let mut rng = rand::thread_rng();

        let weights_input_hidden = (0..input_size)
            .map(|_| (0..hidden_size).map(|_| rng.gen_range(-0.5..0.5)).collect())
            .collect();

        let weights_hidden_output = (0..hidden_size)
            .map(|_| (0..output_size).map(|_| rng.gen_range(-0.5..0.5)).collect())
            .collect();

        Self {
            input_size,
            hidden_size,
            output_size,
            learning_rate,
            weights_input_hidden,
            weights_hidden_output,
        }
    }

    /// ReLU activation function
    fn relu(x: f64) -> f64 {
        x.max(0.0)
    }

    /// Derivative of ReLU for backpropagation
    fn relu_derivative(x: f64) -> f64 {
        if x > 0.0 { 1.0 } else { 0.0 }
    }

    /// Softmax activation function for output layer
    fn softmax(input: &[f64]) -> Vec<f64> {
        let exp_values: Vec<f64> = input.iter().map(|&x| E.powf(x)).collect();
        let sum: f64 = exp_values.iter().sum();
        exp_values.iter().map(|&x| x / sum).collect()
    }

    /// Forward pass to compute output
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

    /// Backpropagation for weight updates based on expected output
    pub fn backpropagate(&mut self, input_data: &[f64], expected_output: &[f64]) {
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

        let output_activations = Self::softmax(&output_layer);

        let output_errors: Vec<f64> = output_activations
            .iter()
            .zip(expected_output)
            .map(|(&output, &expected)| output - expected)
            .collect();

        for j in 0..self.hidden_size {
            for k in 0..self.output_size {
                self.weights_hidden_output[j][k] -= self.learning_rate * output_errors[k] * hidden_layer[j];
            }
        }

        let hidden_errors: Vec<f64> = (0..self.hidden_size)
            .map(|j| {
                let error: f64 = output_errors.iter()
                    .zip(&self.weights_hidden_output[j])
                    .map(|(&output_error, &weight)| output_error * weight)
                    .sum();
                error * Self::relu_derivative(hidden_layer[j])
            })
            .collect();

        for i in 0..self.input_size {
            for j in 0..self.hidden_size {
                self.weights_input_hidden[i][j] -= self.learning_rate * hidden_errors[j] * input_data[i];
            }
        }
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
