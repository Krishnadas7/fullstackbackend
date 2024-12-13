
# Step 1: Use an official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port that your app will run on
EXPOSE 3000

# Step 7: Define the command to start the application
CMD [ "npm", "run", "dev"]

