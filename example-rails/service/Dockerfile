# Base image for both Lambda and Fargate
FROM ruby:3.2.2-alpine as base

# Install system dependencies
RUN apk add --no-cache \
    build-base \
    postgresql-dev \
    tzdata

WORKDIR /app

# Install gems
COPY Gemfile* ./
RUN bundle install --jobs 4 --retry 3

# Copy application files
COPY . .

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile --gemfile app/ lib/

# Lambda-specific configuration
FROM base as lambda
# Install AWS Lambda Web Adapter
RUN apk add --no-cache curl && \
    curl -Lo /usr/local/bin/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /usr/local/bin/aws-lambda-web-adapter

EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

# Fargate-specific configuration
FROM base as fargate
EXPOSE 8080
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
