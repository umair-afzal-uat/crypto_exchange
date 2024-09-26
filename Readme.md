# Crypto Exchange Project

## Overview

This project is a cryptocurrency exchange platform built using Laravel for the backend and React with Next.js for the frontend. It leverages Docker for containerization and Jenkins for Continuous Integration and Continuous Deployment (CI/CD). The application provides a seamless user experience for trading cryptocurrencies while ensuring robust performance and security.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [CI/CD with Jenkins](#cicd-with-jenkins)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Real-time cryptocurrency trading
- Wallet management for deposits and withdrawals
- Comprehensive admin dashboard for managing users and transactions
- Responsive design for mobile and desktop users
- Secure API endpoints with Laravel Passport
- Dockerized environment for easy setup and deployment

## Technologies Used

- **Backend:** Laravel
- **Frontend:** React, Next.js
- **Admin Panel:** React, Next.js
- **Database:** MySQL
- **PHP Version:** 8.x
- **Containerization:** Docker
- **CI/CD:** Jenkins
- **Authentication:** Laravel Passport
- **Real-time Data:** WebSockets

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- PHP >= 8.0
- Composer
- Node.js >= 17.x
- npm or yarn
- Docker and Docker Compose (for containerization)

### Clone the Repository

```bash
git clone https://github.com/yourusername/crypto-exchange.git
cd crypto-exchange
```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd crypto_exchange_backend
   ```

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Create a `.env` file from the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

4. Generate an application key:

   ```bash
   php artisan key:generate
   ```

5. Run migrations to set up the database:

   ```bash
   php artisan migrate --seed
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../crypto_exchange_frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install 
   # or 
   yarn install 
   ```

3. Build the Next.js application:

   ```bash
   npm run build 
   # or 
   yarn build 
   ```

### Admin Panel Setup

1. Navigate to the admin directory:

   ```bash
   cd ../crypto_exchange_admin
   ```

2. Install Node.js dependencies:

   ```bash
   npm install 
   # or 
   yarn install 
   ```

3. Build the Admin Panel application:

   ```bash
   npm run build 
   # or 
   yarn build 
   ```

## Configuration

Update your `.env` files in all directories (backend, frontend, admin) to configure database connections, API URLs, and other environment-specific settings.

## Running the Application

### Using Docker

1. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Access the applications:
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000`
    - Admin Panel: `http://localhost:3001` (if configured)

### Without Docker

1. Start the Laravel server (backend):

    ```bash
    cd crypto_exchange_backend
    php artisan serve --host=0.0.0.0 --port=8000 
    ```

2. Start the Next.js development server (frontend):

    ```bash
    cd ../crypto_exchange_frontend
    npm run dev 
    # or 
    yarn dev 
    ```

3. Start the Admin Panel development server:

    ```bash
    cd ../crypto_exchange_admin
    npm run dev 
    # or 
    yarn dev 
    ```

## CI/CD with Jenkins

This project is set up with Jenkins for CI/CD, allowing for automated testing and deployment.

1. Configure Jenkins to pull from your Git repository.
2. Set up build triggers based on your preferred strategy (e.g., webhook on push).
3. Define build steps to run tests, build images, and deploy to your server.

Refer to Jenkins documentation for detailed setup instructions.

## Docker Setup

The project includes a `docker-compose.yml` file that defines services for backend, frontend, and admin applications.

To customize your Docker setup, modify the `docker-compose.yml` file as needed.

## Contributing

We welcome contributions! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to your branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.