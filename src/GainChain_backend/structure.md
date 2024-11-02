src/
├── lib.rs                   # Main entry point for the backend
├── models/                  # Directory to store data models
│   ├── mod.rs               # Main file for importing models
│   ├── user.rs              # User model and related functions
│   ├── post.rs              # Post model and related functions
│   └── comment.rs           # Comment model and related functions
└── services/                # Directory to store business logic and CRUD operations
    ├── mod.rs               # Main file for importing services
    ├── user_service.rs      # CRUD operations and interactions for users
    ├── post_service.rs      # CRUD operations and interactions for posts
    └── interaction_service.rs # Functions for likes and follows
