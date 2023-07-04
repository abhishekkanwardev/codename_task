FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install express --legacy-peer-deps


# Copy the code
COPY . .

# Build the app
RUN npm run build

# Expose the port on which the API will run
EXPOSE 8000

# Start the API
CMD ["npm", "start"]
