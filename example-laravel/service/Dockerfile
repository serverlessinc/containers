# Base image for both Lambda and Fargate
FROM composer:latest AS composer

WORKDIR /app
COPY composer.* ./
RUN composer install --no-dev --no-scripts --no-autoloader

COPY . .
RUN composer dump-autoload --optimize

FROM php:8.2-alpine AS base

# Install minimal dependencies
RUN docker-php-ext-install opcache

WORKDIR /var/www/html
COPY --from=composer /app .

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Generate application key
RUN php artisan key:generate

# Lambda-specific configuration
FROM base AS lambda
RUN apk add --no-cache curl tini && \
    mkdir -p /opt && \
    curl -Lo /opt/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter && \
    chmod +x /opt/aws-lambda-web-adapter

ENV AWS_LAMBDA_EXEC_WRAPPER=/opt/aws-lambda-web-adapter
EXPOSE 8080
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]

# Fargate-specific configuration
FROM base AS fargate
EXPOSE 8080
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
