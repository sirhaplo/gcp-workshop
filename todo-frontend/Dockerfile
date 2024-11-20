FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy Nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy built assets
COPY --from=build /app/dist/todo-frontend/browser /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080