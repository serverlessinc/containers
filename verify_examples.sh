#!/bin/bash
set -e

# Function to verify an example
verify_example() {
    local example_dir=$1
    echo "Verifying $example_dir..."
    
    # Check required files exist
    for file in "serverless.containers.yml" "README.md" "service/Dockerfile"; do
        if [ ! -f "$example_dir/$file" ]; then
            echo "❌ Missing required file: $file"
            return 1
        fi
    done
    
    # Check serverless.containers.yml content
    if ! grep -q "type: awsApi@1.0" "$example_dir/serverless.containers.yml"; then
        echo "❌ Invalid deployment type in serverless.containers.yml"
        return 1
    fi
    
    if ! grep -q "pathHealthCheck: /health" "$example_dir/serverless.containers.yml"; then
        echo "❌ Missing health check configuration"
        return 1
    fi
    
    # Check Dockerfile for multi-stage builds
    if ! grep -q "FROM.*as.*lambda" "$example_dir/service/Dockerfile"; then
        echo "❌ Missing Lambda stage in Dockerfile"
        return 1
    fi
    
    if ! grep -q "FROM.*as.*fargate" "$example_dir/service/Dockerfile"; then
        echo "❌ Missing Fargate stage in Dockerfile"
        return 1
    fi
    
    # Check for AWS Lambda Web Adapter
    if ! grep -q "aws-lambda-web-adapter" "$example_dir/service/Dockerfile"; then
        echo "❌ Missing AWS Lambda Web Adapter"
        return 1
    fi
    
    # Check README.md for deployment instructions
    if ! grep -q "Deploy to AWS Lambda" "$example_dir/README.md" || \
       ! grep -q "Deploy to AWS ECS Fargate" "$example_dir/README.md"; then
        echo "❌ Missing deployment instructions in README"
        return 1
    fi
    
    echo "✅ $example_dir verification passed"
    return 0
}

# Verify all examples
examples=(
    "example-bun"
    "example-deno"
    "example-laravel"
    "example-rails"
    "example-apollo-graphql"
    "example-apollo-static"
)

failed=0
for example in "${examples[@]}"; do
    if ! verify_example "$example"; then
        failed=1
    fi
done

if [ $failed -eq 0 ]; then
    echo "✅ All examples verified successfully"
else
    echo "❌ Some verifications failed"
    exit 1
fi
