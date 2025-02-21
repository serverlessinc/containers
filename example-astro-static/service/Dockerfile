# Base image for both Lambda and Fargate
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Lambda-specific configuration
FROM base AS lambda
RUN apk add --no-cache curl && \
    curl -Lo /usr/local/bin/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /usr/local/bin/aws-lambda-web-adapter

EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "node", "./dist/server/entry.mjs"]

# Fargate-specific configuration
FROM base AS fargate
EXPOSE 8080
CMD ["node", "./dist/server/entry.mjs"]
