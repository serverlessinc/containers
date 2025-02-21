# Base image for both Lambda and Fargate
FROM oven/bun:1 as base
WORKDIR /app
COPY package.json .
RUN bun install
COPY . .

# Lambda-specific configuration
FROM base as lambda
# Install AWS Lambda Web Adapter
RUN curl -Lo /usr/local/bin/aws-lambda-web-adapter https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter \
    && chmod +x /usr/local/bin/aws-lambda-web-adapter
EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "bun", "run", "start"]

# Fargate-specific configuration
FROM base as fargate
EXPOSE 8080
CMD ["bun", "run", "start"]
