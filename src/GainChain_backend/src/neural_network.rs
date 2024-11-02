use rand::Rng;
use serde_json::Value;
use std::f64::consts::E;
use serde_json::json;

/// Represents a neural network with a single hidden layer
pub struct NeuralNetwork {
    /// The number of neurons in the input layer
    pub input_size: usize,
    /// The number of neurons in the hidden layer
    pub hidden_size: usize,
    /// The number of neurons in the output layer
    pub output_size: usize,
    /// The learning rate used for updating the weights
    pub learning_rate: f64,
    /// The weights connecting the input layer to the hidden layer
    pub weights_input_hidden: Vec<Vec<f64>>,
    /// The weights connecting the hidden layer to the output layer
    pub weights_hidden_output: Vec<Vec<f64>>,
}

impl NeuralNetwork {
    /// Constructor for initializing the neural network with random weights
    ///
    /// # Arguments
    /// * `input_size` - The number of neurons in the input layer
    /// * `hidden_size` - The number of neurons in the hidden layer
    /// * `output_size` - The number of neurons in the output layer
    /// * `learning_rate` - The learning rate for updating the weights
    ///
    /// # Returns
    /// * `NeuralNetwork` - The initialized neural network
    pub fn new(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) -> Self {
        let mut rng = rand::thread_rng();

        // Initialize the weights from input layer to hidden layer
        let weights_input_hidden = (0..input_size)
            .map(|_| (0..hidden_size).map(|_| rng.gen_range(-0.5..0.5)).collect())
            .collect();

        // Initialize the weights from hidden layer to output layer
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

    // Getter methods for private fields
    pub fn input_size(&self) -> usize {
        self.input_size
    }

    /// Returns the size of the hidden layer
    ///
    /// # Returns
    /// * `usize` - The number of neurons in the hidden layer
    pub fn hidden_size(&self) -> usize {
        // Return the hidden size of the neural network
        self.hidden_size
    }

    /// Returns the size of the output layer
    ///
    /// # Returns
    /// * `usize` - The number of neurons in the output layer
    pub fn output_size(&self) -> usize {
        self.output_size
    }

    // Getter methods for private fields
    pub fn learning_rate(&self) -> f64 {
        self.learning_rate
    }

    // Activation functions
    /// The ReLU (Rectified Linear Unit) activation function
    ///
    /// # Arguments
    /// * `x` - The input value to the ReLU function
    ///
    /// # Returns
    /// The output value of the ReLU function
    pub fn relu(x: f64) -> f64 {
        x.max(0.0)
    }

    /// The derivative of the ReLU activation function
    ///
    /// # Arguments
    /// * `x` - The input value to the ReLU derivative function
    ///
    /// # Returns
    /// The derivative of the ReLU function at the given input value
    pub fn relu_derivative(x: f64) -> f64 {
        if x > 0.0 { 1.0 } else { 0.0 }
    }

    /// Applies the softmax function to the input vector
    ///
    /// # Arguments
    /// * `input` - A vector of f64 values representing the input to the softmax function
    ///
    /// # Returns
    /// A vector of f64 values representing the probabilities after applying softmax
    pub fn softmax(input: &Vec<f64>) -> Vec<f64> {
        // Compute the exponentials of each input value
        let exp_values: Vec<f64> = input.iter().map(|&x| E.powf(x)).collect();
        // Sum of all exponentials
        let sum: f64 = exp_values.iter().sum();
        // Normalize each exponential value by dividing by the sum
        exp_values.iter().map(|&x| x / sum).collect()
    }

    /// Forward pass for calculating output
    ///
    /// # Arguments
    /// * `input_data` - Neural network input data
    ///
    /// # Returns
    /// Neural network output
    pub fn forward(&self, input_data: &Vec<f64>) -> Vec<f64> {
        let mut hidden_layer: Vec<f64> = Vec::with_capacity(self.hidden_size);
        // Calculate weighted sum of input neurons
        for j in 0..self.hidden_size {
            let sum: f64 = self.weights_input_hidden.iter()
                .zip(input_data)
                .map(|(weights, &input)| weights[j] * input)
                .sum();
            // Apply activation function to the sum
            hidden_layer.push(Self::relu(sum));
        }

        let mut output_layer: Vec<f64> = Vec::with_capacity(self.output_size);
        // Calculate weighted sum of hidden neurons
        for k in 0..self.output_size {
            let sum: f64 = self.weights_hidden_output.iter()
                .zip(&hidden_layer)
                .map(|(weights, &hidden)| weights[k] * hidden)
                .sum();
            output_layer.push(sum);
        }

        // Apply softmax activation function to the output
        Self::softmax(&output_layer)
    }

    // Backpropagation for weight updates
    ///
    /// Preprocess user data from JSON into neural network input format,
    /// generate recommendations based on the input, and update weights
    /// using backpropagation.
    ///
    /// # Arguments
    /// * `user_data` - JSON input containing user data
    ///
    /// # Returns
    /// JSON output with recommendations
    pub fn backpropagate(&mut self, input_data: &Vec<f64>, expected_output: &Vec<f64>) {
        // Forward pass to get hidden and output layers
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
    
        // Apply softmax on the output layer for probability distribution
        let output_activations = Self::softmax(&output_layer);
    
        // Calculate output layer errors with cross-entropy gradient
        let output_errors: Vec<f64> = output_activations
            .iter()
            .zip(expected_output)
            .map(|(&output, &expected)| output - expected)
            .collect();
    
        // Update weights from hidden layer to output layer
        for j in 0..self.hidden_size {
            for k in 0..self.output_size {
                self.weights_hidden_output[j][k] -= self.learning_rate * output_errors[k] * hidden_layer[j];
            }
        }
    
        // Calculate hidden layer errors
        let hidden_errors: Vec<f64> = (0..self.hidden_size)
            .map(|j| {
                let error: f64 = output_errors.iter()
                    .zip(&self.weights_hidden_output[j])
                    .map(|(&output_error, &weight)| output_error * weight)
                    .sum();
                error * Self::relu_derivative(hidden_layer[j])
            })
            .collect();
    
        // Update weights from input layer to hidden layer
        for i in 0..self.input_size {
            for j in 0..self.hidden_size {
                self.weights_input_hidden[i][j] -= self.learning_rate * hidden_errors[j] * input_data[i];
            }
        }
    }
    

    /// Generate recommendations based on JSON input
    ///
    /// Preprocess user data from JSON into neural network input format
    /// and generate recommendations based on the input.
    ///
    /// # Arguments
    /// * `user_data` - JSON input containing user data
    ///
    /// # Returns
    /// JSON output with recommendations
    pub fn generate_recommendations(&self, user_data: &Value) -> Value {
        // Preprocess user data from JSON into neural network input format
        let input_data: Vec<f64> = user_data.as_array()
            .expect("User data should be an array of numbers")
            .iter()
            .map(|v| v.as_f64().expect("Expected a floating-point number"))
            .collect();

        let output = self.forward(&input_data);

        // Generate JSON output with recommendations
        let recommendations = output.iter()
            .enumerate()
            .map(|(i, &score)| json!({ "item_id": i, "score": score }))
            .collect::<Vec<_>>();

        json!({ "recommendations": recommendations })
    }
}
