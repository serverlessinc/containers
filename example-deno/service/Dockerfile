# Base image for both Lambda and Fargate
FROM denoland/deno:debian-1.40.2 AS base
WORKDIR /app
COPY . .

# Lambda-specific configuration
FROM base AS lambda
# Install AWS Lambda Web Adapter and tini
RUN apt-get update && apt-get install -y curl tini && \
    mkdir -p /opt && \
    curl -Lo /opt/aws-lambda-web-adapter https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /opt/aws-lambda-web-adapter && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
ENV AWS_LAMBDA_EXEC_WRAPPER=/opt/aws-lambda-web-adapter
EXPOSE 8080
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/index.ts"]

# Fargate-specific configuration
FROM base AS fargate
EXPOSE 8080
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "src/index.ts"]
