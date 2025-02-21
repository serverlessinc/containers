# Base image for both Lambda and Fargate
FROM oven/bun:1.0.29 AS base

WORKDIR /app
COPY package.json .
RUN bun install

COPY . .

# Lambda-specific configuration
FROM base AS lambda
RUN apt-get update && apt-get install -y curl tini && \
    mkdir -p /opt && \
    curl -Lo /opt/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /opt/aws-lambda-web-adapter && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV AWS_LAMBDA_EXEC_WRAPPER=/opt/aws-lambda-web-adapter
EXPOSE 8080
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["bun", "run", "start"]

# Fargate-specific configuration
FROM base AS fargate
EXPOSE 8080
CMD ["bun", "run", "start"]
