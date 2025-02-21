# Base image for both Lambda and Fargate
FROM php:8.2-fpm-alpine as base

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql opcache

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application files
COPY . .
RUN composer install --optimize-autoloader --no-dev

# Configure PHP and Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/php.ini /usr/local/etc/php/conf.d/app.ini
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html/src/storage \
    && chmod -R 775 /var/www/html/src/storage

# Lambda-specific configuration
FROM base as lambda
# Install AWS Lambda Web Adapter
RUN curl -Lo /usr/local/bin/aws-lambda-web-adapter \
    https://github.com/awslabs/aws-lambda-web-adapter/releases/latest/download/aws-lambda-web-adapter \
    && chmod +x /usr/local/bin/aws-lambda-web-adapter

EXPOSE 8080
CMD ["aws-lambda-web-adapter", "--port", "8080", "--", "/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Fargate-specific configuration
FROM base as fargate
EXPOSE 8080
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
