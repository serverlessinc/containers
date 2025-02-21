# Bun Example

This example demonstrates using Bun with the Serverless Container Framework (SCF). It provides a simple web server and API that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Bun's native HTTP server
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks and basic routing
- TypeScript support
- Minimal dependencies

## Getting Started

1. Install dependencies:
```bash
cd service
bun install
```

2. Run locally:
```bash
bun run start
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

The example uses Bun's native HTTP server functionality to create a simple web server. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently.
