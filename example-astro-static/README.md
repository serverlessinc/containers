# Astro Static Site Example

This example demonstrates using Astro with the Serverless Container Framework (SCF). It provides a static site that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Astro
- Zero-JS by default
- Server-side rendering support
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks
- Optimized for production deployment

## Getting Started

1. Install dependencies:
```bash
cd service
npm install
```

2. Run locally:
```bash
npm run dev
```

The site will be available at http://localhost:8080

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

The example uses Astro to create a static site with optional SSR capabilities. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The application demonstrates:
- File-based routing
- Environment variable access
- Zero-JS by default
- Health check endpoints
- Optimized builds

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently.

## Environment Variables

The following environment variables are available:
- `SERVERLESS_NAMESPACE`
- `SERVERLESS_CONTAINER_NAME`
- `SERVERLESS_STAGE`
- `SERVERLESS_COMPUTE_TYPE`
- `SERVERLESS_LOCAL`
