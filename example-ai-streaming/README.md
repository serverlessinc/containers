# Example AI Streaming Application

This repository demonstrates AI streaming using Express and Server-Sent Events (SSE) to stream live AI responses from multiple providers (OpenAI and Anthropic). The application is built and deployed using the **Serverless Container Framework (SCF)**, which simplifies containerization, local development, and deployment on AWS (either via Lambda or ECS Fargate).

<img width="600" alt="Screenshot 2025-02-04 at 4 56 22 PM" src="https://github.com/user-attachments/assets/4b764c68-c35e-4c46-bf14-bcfc0b6fe49a" />

---

## Overview

- **AI Streaming:** An Express-based server streaming AI responses using SSE.
- **Multi-Provider Support:** Integration with both OpenAI and Anthropic APIs for AI completions.
- **Serverless Container Framework:** Leverages SCF to manage container builds, deployments, and removals.
- **Local Development:** Use `serverless dev` for hot reloading and local emulation of the cloud environment.
- **Deployment & Cleanup:** Utilize SCF commands such as `serverless deploy` and `serverless remove` to handle AWS resource provisioning and teardown.

---

## Prerequisites

- **Node.js:** (LTS version recommended)
- **Docker:** Ensure it is running on your machine for container builds and local development.
- **AWS Credentials:** Properly configured if you plan to deploy to AWS.
- **Environment Variables:**  
  - `OPENAI_API_KEY`  
  - `ANTHROPIC_API_KEY`

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Service Directory:**
   ```bash
   cd containers/example-ai-streaming/service
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**  
   Create a `.env` file in the `service` directory with the following content:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

---

## Serverless Container Framework Integration

This project utilizes the Serverless Container Framework (SCF) to streamline containerized application development and deployment. SCF automates critical tasks including container image building, environment provisioning (ALB, VPC, compute resources), and state management.

- **SCF Configuration:**  
  The configuration file is located at `serverless.containers.yml` in the project root. An example configuration:

  ```yaml
  name: ai-streaming

  deployment:
    type: awsApi@1.0

  containers:
    service:
      src: ./service
      routing:
        pathPattern: /*
        pathHealthCheck: /health
      environment:
        OPENAI_API_KEY: ${env:OPENAI_API_KEY}
        ANTHROPIC_API_KEY: ${env:ANTHROPIC_API_KEY}
      compute:
        type: awsLambda # or awsFargateEcs
  ```

---

## Development

SCF provides a dedicated development mode to facilitate local testing with hot reloading and file watching.

- **Start Local Development:**
  ```bash
  serverless dev
  ```
  - This command will launch a local instance of the application with real-time file change detection.
  - It emulates the cloud deployment environment, allowing you to test routes, hot reloading, and integration with AWS IAM roles.

---

## Deployment

Deploy the application to AWS using the SCF deployment command. During deployment, SCF handles building the Docker container image, pushing it to AWS ECR, and creating/updating AWS resources.

- **Deploy Application:**
  ```bash
  serverless deploy
  ```
  - **Initial Deployment:** May take 5-10 minutes due to provisioning of infrastructure (ALB, VPC, compute resources, etc.).
  - **Incremental Updates:** Subsequent deployments are faster as SCF updates only the changed components.

---

## Cleanup

Remove AWS resources when they are no longer needed. SCF provides commands to safely remove the deployed resources.

- **Remove Application Resources:**
  ```bash
  serverless remove
  ```
- **Force Removal (including shared infrastructure like VPC, ALB, ECS Cluster, etc.):**
  ```bash
  serverless remove --force
  ```

---

## Running Tests

Basic tests are provided using Jest and Supertest. To execute the tests, run:

```bash
npm test
```

---

## Project Structure

```
example-ai-streaming/
├── service/
│   ├── src/
│   │   ├── index.js           # Main Express application entry point
│   │   ├── routes/            # API route definitions (including AI streaming endpoint)
│   │   ├── middleware/        # Custom middleware (e.g., error handling)
│   │   └── public/            # Static assets (HTML, CSS, JS)
│   ├── package.json           # Node.js project configuration and dependencies
│   └── .env                   # Environment configuration (not committed)
├── serverless.containers.yml  # Serverless Container Framework configuration file
└── README.md                  # This documentation file
```

---

## Additional Information

- **SCF Documentation:**  
  For detailed guidance on the Serverless Container Framework, refer to the documentation available [here](https://serverless.com/containers/docs). This includes comprehensive guides on configuration, CLI command usage (`serverless deploy`, `serverless dev`, `serverless remove`), and best practices for containerized deployments.

- **Local Development Tips:**  
  Make sure Docker is running on your local machine to enable full local development functionality, including container build and file watching for hot reloads.
