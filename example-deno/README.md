# Deno V2 Example for Serverless Container Framework

Serverless Container Framework (SCF) is a tool that eases development and deployment of containerized applications to AWS Lambda and/or AWS Fargate ECS.

This example demonstrates how to develop and deploy a simple and performant web application using Deno V2 and the Oak framework using the Serverless Container Framework.

## Features

- **Deno V2 Support:** Utilizes the official Deno V2 image to run your Deno application.
- **Oak Framework:** Utilizes the [Oak framework](https://deno.land/x/oak), a middleware framework for handling HTTP requests.
- **Compute Flexibility:** Configure the container's compute type to either run as an AWS Lambda function (`awsLambda`) or on AWS Fargate ECS (`awsFargateEcs`) via SCF and a multi-stage Dockerfile is already provided.
- **Local Development:** SCF supports a rich development mode that supports local emulation of AWS ALB routing and AWS Lambda and AWS Fargate ECS. Develop and test your Deno application locally with near-production parity.

## Prerequisites

**Docker:** Install and start Docker Desktop as it is required. Get it from [here](https://www.docker.com).

**Install Serverless Framework:** Serverless Container Framework is a feature of the Serverless Framework.

```
npm i -g serverless
```

**AWS Credentials:** Properly configure your AWS credentials (via environment variables or AWS profiles) to allow SCF to provision and update AWS resources. These are required to use Serverless Container Framework.

## Configuration

The root of the example contains a `serverless.containers.yml` file which defines the project configuration:

```yaml
name: deno

deployment:
  type: awsApi@1.0

containers:
  service:
    src: ./service
    routing:
      pathPattern: /*
      pathHealthCheck: /health
    environment:
      HELLO: world
    compute:
      type: awsLambda # Can be switched to awsFargateEcs
    build:
      options:
        - --target=awsLambda # Ensure you match the compute type set above. Sets the target build stage for the Dockerfile.
```

This file specifies:
- **Namespace:** The project name is `deno`. This is used to namespace resources in your AWS account, as a prefix.
- **Deployment Type:** Using the AWS API deployment type to configure networking (ALB, VPC, etc.).
- **Container Details:**  
  - Source code is in the `./service` directory.
  - Routing rules specify a catch-all route (`/*`) with a defined health check endpoint (`/health`).
  - An environment variable (`HELLO`) is provided.
  - The default compute type is set to `awsLambda` but can be switched to `awsFargateEcs` as needed.

```
example-deno/
├── serverless.containers.yml      # SCF project configuration file
└── service/
    ├── Dockerfile                 # Multi-stage Dockerfile for AWS Lambda and Fargate builds
    ├── deno.json                  # Deno configuration and task definitions
    └── src/
        ├── index.ts               # Main application entrypoint (uses Oak and oakCors)
        └── public/
            └── css/
                └── styles.css     # Static assets (CSS, images, etc.)
```

## Development

Serverless Container Framework has a dev mode feature that will enable local emulation of the AWS Application Load Balancer at `http://localhost:3000`, enabling you to test routing, static asset delivery, and health check endpoints locally. It will also start your container with Deno and proxy requests to it on port `8080`.
  
Run the following command to start local development mode:

```bash
serverless dev
```

This will auto watch for changes and rebuild the container when those happen.

## Deployment

To deploy this example with SCF, open your terminal in the `example-deno` directory.

Execute the following command to deploy your container to AWS:

```bash
serverless deploy
```

This command builds the Deno container image using the provided Dockerfile and provisions AWS resources (ALB, VPC, Lambda function or ECS Fargate service).

If you switch compute types, ensure that you set the `build` `--target` option to points to the same compute type, given there are multiple compute type build configurations declared in your Dockerfile.

Once deployed, SCF will output the URLs and endpoints (such as the ALB endpoint) for your application.

Access the application via the provided URL to see your Deno app live.

To remove the deployed containers, run:

```bash
serverless remove
```

To remove all AWS resources including shared infrastructure, use:

```bash
serverless remove --force --all
```

## Additional Resources

* [Serverless Container Framework Documentation](https://serverless.com/containers/docs)
* [Official Deno Website](https://deno.land/)
