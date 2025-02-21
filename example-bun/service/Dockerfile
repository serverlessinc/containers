# Base image for both Lambda and Fargate
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json .
RUN bun install
COPY . .

# Lambda-specific configuration
FROM base AS lambda
# Install AWS Lambda Web Adapter
RUN apt-get update && apt-get install -y curl && \
    curl -Lo /usr/local/bin/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /usr/local/bin/aws-lambda-web-adapter && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "bun", "run", "start"]

# Fargate-specific configuration
FROM base AS fargate
EXPOSE 8080
CMD ["bun", "run", "start"]
