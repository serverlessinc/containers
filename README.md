![scf-readme-3](https://github.com/user-attachments/assets/38751c4c-3632-4be2-b15f-d92ace24bd9e)

**The missing link between serverless and containers** - Serverless Container Framework (SCF) is a unified development and deployment experience for containers on serverless platforms.

In this initial release, SCF focuses on delivering an API architecture that leverages AWS Application Load Balancer for request routing, allowing developers to freely mix and transition between AWS Lambda and AWS ECS Fargate compute options.

* [Overview Video (90 seconds)](https://youtu.be/KFCSo4N-Bxo)
* [Feedback Form](https://form.typeform.com/to/iqaERaLP)

# Features

### Unified Container Development & Deployment
- Deploy seamlessly to AWS Lambda and ECS Fargate via a single workflow (and more providers soon)
- Mix Lambda and Fargate compute within a single API
- Switch compute platforms instantly without code rewrites or downtime
- Optimize container builds automatically for each compute service
- Write Node.js and Python apps naturally - No Dockerfiles needed
- Get production-ready infrastructure in seconds with automated VPC, networking & ALB setup

### Rich Development Experience
- Develop Lambda and Fargate containers rapidly with true local emulation
- Route and simulate AWS ALB requests via localhost
- Accelerate development with instant hot reloading
- Inject live AWS IAM roles into your containers
- Enjoy an elegant logging and debugging experience

### Production-Ready Features
- Smart code/config change detection for deployments
- Supports one or multiple custom domains on the same API
- Automatic SSL certificate management
- Secure AWS IAM and network defaults
- Load environment variables from .env, AWS Secrets Manager, AWS Systems Manager Parameter Store, HashiCorp Vault, HashiCorp Terraform state, and more via [Serverless Framework Variables](https://www.serverless.com/framework/docs/guides/variables)
- Multi-cloud support coming soon

# Example Configuration

The following is a simple example of a `serverless.containers.yml` file, for a classic full-stack application.

```yaml
namespace: acmeinc

provider:
  type: aws
  aws:
    region: us-east-1

containers:
  # Web (Frontend)
  service-web:
    src: ./web
    routing:
      domain: acmeinc.com
      pathPattern: /*
    compute:
      type: awsLambda
  # API (Backend)
  service-api:
    src: ./api
    routing:
      domain: api.acmeinc.com
      pathPattern: /api/*
      pathHealthCheck: /health
    compute:
      type: awsFargateEcs
      awsFargateEcs:
        memory: 4096
        cpu: 1024
      environment:
        HELLO: world
      awsIam:
        customPolicy:
          Version: "2012-10-17"
          Statement:
            - Effect: Allow
              Action:
                - dynamodb:GetItem
              Resource:
                - "*"
```


# Quick Start

### Prerequisites
- Node.js 20.x or later
- AWS Account with administrative access
- Docker installed and running

### Installation & Setup

1. Install the Serverless Framework CLI globally:

```bash
npm install -g serverless
```

2. Configure your AWS credentials using one of these methods:

```bash
# Option 1: AWS CLI (recommended)
aws configure

# Option 2: Environment variables
export AWS_ACCESS_KEY_ID=your-key-id
export AWS_SECRET_ACCESS_KEY=your-access-key
export AWS_SESSION_TOKEN=your-session-token
```

### Getting Started

1. Start with an example project by cloning the repository:
```bash
git clone https://github.com/serverless/containers.git
```

2. Navigate to the example project directory, and install any dependencies:
```bash
cd example-express/service
npm install
```

### Development

Ensure you are within the directory containing the `serverless.containers.yml` file.
```bash
cd example-express
```

Start the local development environment:
```bash
serverless dev
```

This starts a local emulation of AWS Application Load Balancer at `http://localhost:3000`. This will forward requests to your containers. Logs, requests and more from your containers will be available in the terminal. Your containers will auto-reload or rebuild on code changes.

### Deployment

Deploy to AWS:
```bash
serverless deploy
```

The initial deployment creates AWS resources (ALB, VPC, etc.) and takes ~5-10 minutes. Subsequent deploys are faster.

### Cleanup

Remove your deployment:
```bash
# Remove application only
serverless remove

# Remove all AWS resources including VPC
serverless remove --force
```

### Troubleshooting
- Ensure Docker daemon is running for local development
- Check AWS credentials are properly configured using `aws sts get-caller-identity`
- View detailed logs with `serverless dev --debug` or `serverless deploy --debug`











