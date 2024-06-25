#!/bin/bash

# Colors for pretty output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print messages
print_message() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print error messages
print_error() {
    echo -e "${RED}$1${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Check prerequisites
print_message "Step 1: Checking prerequisites..."

if ! command_exists docker; then
    print_error "Docker is not installed. Please install Docker from https://www.docker.com/get-started"
    exit 1
fi

if ! command_exists ngrok; then
    print_error "ngrok is not installed. Please install ngrok from https://ngrok.com/download"
    exit 1
fi

print_message "All prerequisites are installed."

# Step 2: Get user input
print_message "Step 2: Gathering user input..."

read -p "Enter your custom domain (e.g., services.azazahamed.com): " CUSTOM_DOMAIN
read -p "Enter your ngrok auth token: " NGROK_AUTH_TOKEN
read -p "Enter your ngrok domain (e.g., abc.ngrok-free.app): " NGROK_DOMAIN
read -p "Please enter your Clerk Publishable Key: " CLERK_PUBLISHABLE_KEY
read -p "Please enter your Clerk Secret": CLERK_SECRET_KEY
read -p "Do you want to set up SSL certificates with Certbot? (y/n): " SETUP_SSL

# Step 3: Generate SSL certificates (optional)
if [ "$SETUP_SSL" = "y" ]; then
    if ! command_exists certbot; then
        print_error "Certbot is not installed. Please install Certbot from https://certbot.eff.org/"
        exit 1
    fi

    print_message "Step 3: Generating SSL certificates with Certbot..."

    sudo mkdir -p /etc/letsencrypt/live/${CUSTOM_DOMAIN}
    sudo certbot certonly --standalone -d ${CUSTOM_DOMAIN} || {
        print_error "Failed to generate SSL certificates with Certbot."
        exit 1
    }

    mkdir -p nginx/ssl
    sudo cp /etc/letsencrypt/live/${CUSTOM_DOMAIN}/fullchain.pem nginx/ssl/cert.pem
    sudo cp /etc/letsencrypt/live/${CUSTOM_DOMAIN}/privkey.pem nginx/ssl/key.pem

    print_message "SSL certificates copied to nginx/ssl/."
else
    print_message "Skipping SSL setup."
fi

# Step 4: Create .env file
print_message "Step 4: Creating .env file..."

cat <<EOF > .env
POSTGRES_USER=your_local_db_user
POSTGRES_PASSWORD=your_local_db_password
POSTGRES_DB=your_local_db_name
PGADMIN_DEFAULT_EMAIL=your_email@example.com
PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}
NGROK_DOMAIN=${NGROK_DOMAIN}
NGROK_HOST_HEADER=${NGROK_DOMAIN}
EOF

print_message "Root .env file created."

# Step 5: Create frontend .env.local file
mkdir -p fe
cat <<EOF > fe/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PUBLISHABLE_KEY}
CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

NEXT_PUBLIC_API_BASE_URL=/api
EOF

print_message "Frontend .env.local file created."

# Step 6: Create backend .env file
mkdir -p be
cat <<EOF > be/.env
CLERK_SECRET_KEY=${CLERK_SECRET_KEY}

DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=your_local_db_user
DB_PASSWORD=your_local_db_password
DB_NAME=your_local_db_name
EOF

print_message "Backend .env file created."

# Step 7: Create NGINX configuration
print_message "Step 7: Creating NGINX configuration..."

mkdir -p nginx/ssl

cat <<EOF > nginx/nginx.conf
events { }

http {
    # Configuration for custom domain
    server {
        listen 80;
        server_name ${CUSTOM_DOMAIN};
EOF

if [ "$SETUP_SSL" = "y" ]; then
    cat <<EOF >> nginx/nginx.conf
        location / {
            return 301 https://\$host\$request_uri;
        }
    }

    server {
        listen 443 ssl;
        server_name ${CUSTOM_DOMAIN};

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://next_app:3000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /api {
            proxy_pass http://nest_app:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
EOF
else
    cat <<EOF >> nginx/nginx.conf
        location / {
            proxy_pass http://next_app:3000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /api {
            proxy_pass http://nest_app:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
EOF
fi

cat <<EOF >> nginx/nginx.conf
    # Configuration for ngrok domain
    server {
        listen 80;
        server_name ${NGROK_DOMAIN};

        location / {
            proxy_pass http://next_app:3000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /api {
            proxy_pass http://nest_app:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }

    server {
        listen 443 ssl;
        server_name ${NGROK_DOMAIN};

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://next_app:3000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /api {
            proxy_pass http://nest_app:3001;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOF

print_message "NGINX configuration created."

# Step 8: Build and Start the Services
print_message "Step 9: Building and starting the services..."
# TODO : Add --build
docker-compose up -d || {
    print_error "Failed to build and start the services."
    exit 1
}

print_message "All services have been successfully started! Your backend services are accessible at ${CUSTOM_DOMAIN}/api or ${NGROK_DOMAIN}/api"

# Step 9: Generate ngrok.yml and start_ngrok.sh
print_message "Step 8: Generating ngrok.yml and start_ngrok.sh..."

cat <<EOF > ngrok.yml
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

cat <<EOF > start_ngrok.sh
#!/bin/bash

# Load environment variables
source .env

# Function to check if a port is in use
check_port() {
    nc -z localhost \$1 > /dev/null 2>&1
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
authtoken: \${NGROK_AUTH_TOKEN}
version: "2"
web_addr: localhost:4040
tunnels:
  nginx:
    addr: 80
    proto: http
    domain: \${NGROK_DOMAIN}
    host_header: \${NGROK_DOMAIN}
  nginx-https:
    addr: 443
    proto: http
    domain: \${NGROK_DOMAIN}
    host_header: \${NGROK_DOMAIN}
EOF

echo "ngrok.yml has been generated with environment variables."

# Start ngrok
echo "Starting ngrok..."
ngrok start --all --config=./ngrok.yml
EOF

chmod +x start_ngrok.sh

print_message "ngrok.yml and start_ngrok.sh have been generated."