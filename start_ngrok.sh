#!/bin/bash

# Load environment variables
source .env

# Function to check if a port is in use
check_port() {
    nc -z localhost $1 > /dev/null 2>&1
}

# Check if services are running
if ! check_port 3000; then
    echo "Error: Service on port 3000 (frontend) is not running."
    echo "Please start your Docker containers with: docker-compose up -d"
    exit 1
fi

if ! check_port 3001; then
    echo "Error: Service on port 3001 (backend) is not running."
    echo "Please start your Docker containers with: docker-compose up -d"
    exit 1
fi

# Generate ngrok.yml
cat << EOF > ngrok.yml
authtoken: ${NGROK_AUTH_TOKEN}
version: "2"
web_addr: localhost:4040
tunnels:
  nginx:
    addr: 80
    proto: http
    domain: ${NGROK_DOMAIN}
    host_header: ${NGROK_DOMAIN}
  nginx-https:
    addr: 443
    proto: http
    domain: ${NGROK_DOMAIN}
    host_header: ${NGROK_DOMAIN}
EOF

echo "ngrok.yml has been generated with environment variables."

# Start ngrok
echo "Starting ngrok..."
ngrok start --all --config=./ngrok.yml