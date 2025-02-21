# Base image for both Lambda and Fargate
FROM php:8.2-alpine as base

# Install minimal dependencies
RUN docker-php-ext-install pdo pdo_mysql opcache

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .
RUN composer install --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/html/src/storage \
    && chmod -R 775 /var/www/html/src/storage

# Lambda-specific configuration
FROM base as lambda
RUN apk add --no-cache curl && \
    curl -Lo /usr/local/bin/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter \
    && chmod +x /usr/local/bin/aws-lambda-web-adapter

EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]

# Fargate-specific configuration
FROM base as fargate
EXPOSE 8080
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
