# Use an official Node runtime as a parent image
FROM node:12-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variables
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "server.js"]

