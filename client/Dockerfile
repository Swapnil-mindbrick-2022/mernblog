# Start from the official Node.js image version 16.x
FROM node:16

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container's working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies defined in package.json
RUN npm install

# Copy the remaining client application files to the container's working directory
COPY . .

# Expose port 3000 to allow external access to the development server
EXPOSE 3000

# Command to run the development server when the container starts
CMD ["npm", "run", "dev"]
