# Use Node.js 20 Alpine as the base image
FROM node:20-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
