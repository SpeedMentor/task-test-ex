# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3004

# Start the application
CMD ["node", "src/app.js"]
