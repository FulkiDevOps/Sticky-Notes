#!/bin/bash

# 1. Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "Error: docker-compose is not installed."
    exit 1
fi

echo "Docker Compose found."

# 2. Create the backend .env file if it doesn't exist
ENV_FILE="./backend/.env"
ENV_EXAMPLE="./backend/.env.example"

if [ ! -f "$ENV_FILE" ]; then
    if [ -f "$ENV_EXAMPLE" ]; then
        echo "Creating $ENV_FILE from $ENV_EXAMPLE..."
        cp "$ENV_EXAMPLE" "$ENV_FILE"
    else
        echo "Warning: $ENV_EXAMPLE not found. The backend might fail to start."
    fi
fi

# 3. Build and start the development containers
echo "Building and starting development containers..."
echo "This will attach to your terminal. Press Ctrl+C to stop."

# We use the default 'docker-compose.yml' file
# We add '--build' to rebuild if code changed
# We DON'T use '-d' because we want to see the logs
docker-compose up --build

if [ $? -ne 0 ]; then
    echo "Error: docker-compose up failed."
    exit 1
fi