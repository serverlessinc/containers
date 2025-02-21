# Deno V2 Example

This example demonstrates using Deno V2 with the Serverless Container Framework (SCF). It provides a simple web server and API that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Deno V2 and Oak framework
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks and basic routing
- Static file serving
- CORS support
- Modern Deno features and TypeScript support

## Getting Started

1. Install Deno:
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

2. Run locally:
```bash
cd service
deno task start
```

The server will be available at http://localhost:8080

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

The example uses Oak, a middleware framework for Deno, to create a simple web server. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently. The application demonstrates modern Deno V2 features including:
- Native TypeScript support
- Modern ES modules
- Built-in testing capabilities
- Enhanced security through permissions
