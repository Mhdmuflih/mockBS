# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (including development dependencies)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the application will use (adjust port as needed)
EXPOSE 2000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
