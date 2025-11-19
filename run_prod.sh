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

# 3. Build and start the production containers
echo "Building and starting production containers... (this may take a moment)"
docker-compose -f docker-compose.prod.yml up -d --build

if [ $? -ne 0 ]; then
    echo "Error: docker-compose up failed."
    exit 1
fi

# 4. Wait for services to stabilize (especially the DB healthcheck)
echo "Waiting for services to initialize (10 seconds)..."
sleep 10

# 5. Run Prisma production migrations
echo "Applying production database migrations..."
docker exec notes_backend_prod npx prisma migrate deploy

if [ $? -ne 0 ]; then
    echo "Warning: Prisma migration failed. It might have been applied already."
fi

# 6. Restart the backend to ensure it connects with the applied schema
echo "Restarting the backend service..."
docker restart notes_backend_prod

echo "---"
echo "Production deployment complete!"
echo "Access the application at: http://localhost"
echo "---"