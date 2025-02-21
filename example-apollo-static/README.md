# Apollo Static Site Example

This example demonstrates using Apollo Client with Next.js in the Serverless Container Framework (SCF). It provides a static site with SSR capabilities that can be deployed to either AWS Lambda or AWS ECS Fargate.

## ⚠️ Important Note on Compute Type
Due to the nature of SSR with Apollo Client and Next.js, the resulting bundle size might exceed AWS Lambda limits. For production deployments, we recommend using AWS ECS Fargate as the compute type. If you must use Lambda, consider:
- Implementing static generation where possible
- Reducing the bundle size through code splitting
- Monitoring Lambda size limits carefully

## Features
- Built with Next.js 14 and Apollo Client
- Server-Side Rendering (SSR) support
- GraphQL data fetching
- Supports both AWS Lambda and ECS Fargate deployment
- Includes health checks
- Optimized for production deployment

## Getting Started

1. Install dependencies:
```bash
cd service
npm install
```

2. Set up environment:
```bash
# Create .env.local with your GraphQL API endpoint
echo "APOLLO_ROUTER_URL=http://your-graphql-api/graphql" > .env.local
```

3. Run locally:
```bash
npm run dev
```

The site will be available at http://localhost:3000

## Deployment

### Prerequisites
- Serverless Framework installed (`npm install -g serverless`)
- AWS credentials configured
- Docker installed and running
- GraphQL API endpoint available

### Deploy to AWS Lambda (with size limitations)

1. Update `serverless.containers.yml`:
```yaml
compute:
  type: awsLambda
```

2. Deploy:
```bash
serverless deploy
```

### Deploy to AWS ECS Fargate (recommended)

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

The example uses Next.js with Apollo Client to create a static site with SSR capabilities. When deploying to AWS Lambda, it utilizes the AWS Lambda Web Adapter to handle HTTP requests. For Fargate deployments, it runs as a standard container application.

The application demonstrates:
- Modern Next.js App Router setup
- Apollo Client integration with SSR
- GraphQL data fetching
- Optimized production builds
- Health check endpoints

The Dockerfile includes multi-stage builds to support both Lambda and Fargate deployments efficiently, with special consideration for bundle sizes in Lambda deployments.

## Environment Variables

The following environment variables are required:
- `APOLLO_ROUTER_URL` - URL of your GraphQL API endpoint
- `NODE_ENV` - Application environment (production/development)

## Size Optimization Tips

If deploying to Lambda, consider these optimization techniques:
1. Use static generation where possible
2. Implement code splitting
3. Optimize image assets
4. Monitor and reduce dependencies
5. Use the standalone output option
