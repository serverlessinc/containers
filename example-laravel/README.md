# Laravel API Example

This example demonstrates using Laravel with the Serverless Container Framework (SCF). It provides a PHP web API that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Laravel 10
- RESTful API endpoints
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks and basic routing
- Optimized PHP-FPM and Nginx configuration
- Proper process management with Supervisor

## Getting Started

1. Install dependencies:
```bash
cd service
composer install
```

2. Set up environment:
```bash
cp .env.example .env
php artisan key:generate
```

3. Run locally:
```bash
php artisan serve
```

The API will be available at http://localhost:8000

## Deployment

### Prerequisites
- Serverless Framework installed (`npm install -g serverless`)
- AWS credentials configured
- Docker installed and running

### Deploy to AWS Lambda

1. Update `serverless.containers.yml`:
```yaml
compute:
  type: awsLambda
```

2. Deploy:
```bash
serverless deploy
```

### Deploy to AWS ECS Fargate

1. Update `serverless.containers.yml`:
```yaml
compute:
  type: awsFargateEcs
```

2. Deploy:
```bash
serverless deploy
```

## Architecture

The example uses Laravel's API features to create a robust web API. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The application uses:
- Nginx as the web server
- PHP-FPM for PHP processing
- Supervisor for process management
- Optimized configurations for both Lambda and Fargate environments

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently. The container is configured to run both Nginx and PHP-FPM under Supervisor, ensuring proper process management in both environments.

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Server information endpoint

## Environment Variables

The following environment variables are required:
- `APP_KEY` - Laravel application key
- `APP_ENV` - Application environment (production/development)
- `APP_DEBUG` - Debug mode (true/false)
- `DB_CONNECTION` - Database connection type
