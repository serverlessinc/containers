# Ruby on Rails API Example

This example demonstrates using Ruby on Rails with the Serverless Container Framework (SCF). It provides a Ruby web API that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Rails 7.1
- API-only configuration for better performance
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks and basic routing
- Optimized for container deployment
- Uses Puma web server

## Getting Started

1. Install dependencies:
```bash
cd service
bundle install
```

2. Set up environment:
```bash
export SECRET_KEY_BASE=$(bundle exec rails secret)
```

3. Run locally:
```bash
bundle exec rails server
```

The API will be available at http://localhost:8080

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

The example uses Rails' API-only mode to create a lightweight web API. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The application uses:
- Puma as the web server
- API-only mode for better performance
- Bootsnap for faster boot times
- Optimized configurations for both Lambda and Fargate environments

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently.

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Server information endpoint

## Environment Variables

The following environment variables are required:
- `SECRET_KEY_BASE` - Rails secret key base
- `RAILS_ENV` - Application environment (production/development)
- `RAILS_LOG_TO_STDOUT` - Enable logging to STDOUT
- `RAILS_SERVE_STATIC_FILES` - Enable serving static files
