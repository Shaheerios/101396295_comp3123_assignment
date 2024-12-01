# Use Node.js base image for React app
FROM node:16 as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source code and build it
COPY . .
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the frontend
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]