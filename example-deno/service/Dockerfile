# Base image for both Lambda and Fargate
FROM denoland/deno:1.40.2 as base
WORKDIR /app
COPY . .

# Lambda-specific configuration
FROM base as lambda
# Install AWS Lambda Web Adapter
RUN apt-get update && apt-get install -y curl && \
    curl -Lo /usr/local/bin/aws-lambda-web-adapter https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /usr/local/bin/aws-lambda-web-adapter
EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "deno", "task", "start"]

# Fargate-specific configuration
FROM base as fargate
EXPOSE 8080
CMD ["deno", "task", "start"]
