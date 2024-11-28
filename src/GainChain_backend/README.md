# GainChain Backend

A decentralized social media platform backend, leveraging Rust and Actix for high-performance and scalable APIs.

## Features
- Secure JWT authentication and authorization.
- Project and user management with custom settings.
- Secure and modular backend with Actix Web.

## Getting Started

### Prerequisites
- Rust (latest stable version)
- PostgreSQL database

### Environment Variables
Set up the following variables in a `.env` file:
- `DATABASE_URL` - The URL to your PostgreSQL database.
- `JWT_SECRET` - A random string used to sign JWT tokens.

### Running Locally

```bash
cargo run


cargo clean
cargo update
cargo build
dfx deploy