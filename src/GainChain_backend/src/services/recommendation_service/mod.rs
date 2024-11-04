// The recommendation service uses a simple neural network to make predictions
// of the user's preferences based on the features of the posts they have liked.
// The neural network is trained using gradient descent and the learning rate
// is set to 0.01.
//
// The neural network is a simple feedforward network with one hidden layer.
// The output of the network is the probability of the user liking the post.
// The input to the network is the feature vector of the post.
// The hidden layer is a ReLU (Rectified Linear Unit) activation function.
// The output layer is a Sigmoid activation function.
//
// The input to the network is the feature vector of the post.
// The feature vector is a vector of the following features:
// 1. The number of likes the post has received.
// 2. The number of comments the post has received.
// 3. The number of words in the post.
// 4. The number of hashtags in the post.
// 5. The number of emojis in the post.
// 6. The number of URLs in the post.
// 7. The number of images in the post.
// 8. The number of videos in the post.
// 9. The number of audio files in the post.
// 10. The number of Gifs in the post.
//
// The hidden layer is a vector of size 64.
// The output layer is a vector of size 1.
//
// The learning rate is set to 0.01.
//
// The gradient descent algorithm is used to update the weights of the neural
// network.
//
// The weights are updated using the following formula:
// W = W - learning_rate * gradient
// where W is the weight matrix, learning_rate is the learning rate, and
// gradient is the gradient of the loss function with respect to the weights.
//
// The loss function is the cross-entropy loss.
//
// The gradient of the loss function with respect to the weights is computed
// using the backpropagation algorithm.
//
// The backpropagation algorithm is a method of computing the gradient of the
// loss function with respect to the weights of a neural network.
// The algorithm works by first computing the output of the network.
// Then, the algorithm computes the error gradient of the loss function with
// respect to the output of the network.
// Finally, the algorithm computes the error gradient of the loss function with
// respect to the weights of the network using the chain rule.
//
// The gradient of the loss function with respect to the weights is computed
// using the following formula:
// dW/dx = dL/dy \* dy/dx
// where L is the loss function, y is the output of the network, and x is the
// input to the network.
//
// The gradient of the loss function with respect to the output of the network
// is computed using the following formula:
// dL/dy = - (t - y)
// where t is the target output and y is the output of the network.
//
// The gradient of the output of the network with respect to the input to the
// network is computed using the following formula:
// dy/dx = W^T \* (1 - y^2)
// where W is the weight matrix and y is the output of the network.
//
use serde_json::{json, Value};
use std::f64::consts::E;
use ic_cdk::api::time;


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
    /// Generates a pseudo-random number based on the current timestamp
    fn ic_random_f64(seed: u64) -> f64 {
        let nanos = time();
        let pseudo_random = nanos.wrapping_add(seed); // Mix in the seed to vary results
        (pseudo_random % 1000) as f64 / 1000.0 // Normalize to [0.0, 1.0)
    }

    /// Initializes the neural network with IC-specific pseudo-random weights
    pub fn new(input_size: usize, hidden_size: usize, output_size: usize, learning_rate: f64) -> Self {
        let mut weights_input_hidden = vec![vec![0.0; hidden_size]; input_size];
        let mut weights_hidden_output = vec![vec![0.0; output_size]; hidden_size];

        // Populate weights_input_hidden with pseudo-random values
        for i in 0..input_size {
            for j in 0..hidden_size {
                weights_input_hidden[i][j] = Self::ic_random_f64((i * hidden_size + j) as u64);
            }
        }

        // Populate weights_hidden_output with pseudo-random values
        for j in 0..hidden_size {
            for k in 0..output_size {
                weights_hidden_output[j][k] = Self::ic_random_f64((j * output_size + k) as u64);
            }
        }

        // Return a new instance of the NeuralNetwork struct
        Self {
            // Size of the input layer
            input_size,
            // Size of the hidden layer
            hidden_size,
            // Size of the output layer
            output_size,
            // Learning rate for the network
            learning_rate,
            // Weights connecting input layer to hidden layer
            weights_input_hidden,
            // Weights connecting hidden layer to output layer
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


    /// Generates recommendations based on user data in JSON format
    ///
    /// # Arguments
    ///
    /// * `user_data` - JSON value containing an array of numbers
    ///
    /// # Returns
    ///
    /// JSON value containing an array of recommendations, each with an "item_id" and a "score"
    pub fn generate_recommendations(&self, user_data: &Value) -> Value {
        // Convert user data to a vector of f64 values
        let input_data: Vec<f64> = user_data.as_array()
            .expect("User data should be an array of numbers")
            .iter()
            .map(|v| v.as_f64().expect("Expected a floating-point number"))
            .collect();

        // Compute the output of the neural network
        let output = self.forward(&input_data);

        // Create a JSON array of recommendations, each with an "item_id" and a "score"
        let recommendations = output.iter()
            .enumerate()
            .map(|(i, &score)| json!({ "item_id": i, "score": score }))
            .collect::<Vec<_>>();

        json!({ "recommendations": recommendations })
    }
}

