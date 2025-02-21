# Apollo GraphQL API Example

This example demonstrates using Apollo Server with the Serverless Container Framework (SCF). It provides a GraphQL API that can be deployed to either AWS Lambda or AWS ECS Fargate.

## Features
- Built with Apollo Server 4
- GraphQL API with Express integration
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks
- CORS support
- Example queries and resolvers

## Getting Started

1. Install dependencies:
```bash
cd service
npm install
```

2. Run locally:
```bash
npm start
```

The GraphQL API will be available at http://localhost:8080
The GraphQL Playground will be available at http://localhost:8080/graphql

## Example Queries

```graphql
# Health Check
query {
  health
}

# Server Info
query {
  info {
    namespace
    containerName
    stage
    computeType
    local
  }
}
```

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

The example uses Apollo Server 4 with Express integration to create a GraphQL API. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The application demonstrates:
- Modern Apollo Server setup
- GraphQL schema definition
- Resolver implementation
- Express middleware integration
- Health check endpoints

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently.

## Environment Variables

The following environment variables are available in resolvers:
- `SERVERLESS_NAMESPACE`
- `SERVERLESS_CONTAINER_NAME`
- `SERVERLESS_STAGE`
- `SERVERLESS_COMPUTE_TYPE`
- `SERVERLESS_LOCAL`
