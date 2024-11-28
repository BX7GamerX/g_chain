gain_chain_backend/
├── src/
│   ├── controllers/               # Controllers for each core module (auth, recommendation, etc.)
│   │   ├── auth_controller.rs     # Handles Internet Identity login
│   │   ├── recommendation_controller.rs # For recommendations
│   │   ├── project_controller.rs  # For project storage
│   ├── services/                  # Core business logic (e.g., neural network, user services)
│   │   ├── neural_net_service.rs  # Recommendation service
│   ├── models/                    # Defines data structures (e.g., user, project)
│   │   ├── user_model.rs          # User-related models
│   │   ├── project_model.rs       # Project-related models
│   ├── utils/                     # Helper functions (e.g., canister utils)
│   │   ├── canister_utils.rs      # Canister utility functions
│   ├── lib.rs                     # Entry point (server setup, routes)
├── Cargo.toml
└── gain_chain_backend.did         # Candid interface for ICP
