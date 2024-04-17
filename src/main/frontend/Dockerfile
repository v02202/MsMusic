# Build stage
FROM node:18 AS build

WORKDIR /frontend

# Copy package.json and package-lock.json to the container
COPY src/main/frontend/package*.json ./

RUN npm config set registry https://registry.npmjs.com/
# Install dependencies
RUN npm install -g npm@10.5.2
# RUN npm uninstall
RUN npm install && npm cache clean --force

# Copy the rest of the application code
COPY src/main/frontend /frontend

# Build the React app
CMD ["npm", "start"]
