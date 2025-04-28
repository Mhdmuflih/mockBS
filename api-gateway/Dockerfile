FROM node:18

# Set the working directory to the root of your project (not /src/app)
WORKDIR /src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port you want to use (optional if your app listens on port 8000)
EXPOSE 8000

# Build and start your TypeScript server (gateway.ts)
CMD ["npm", "start"]
