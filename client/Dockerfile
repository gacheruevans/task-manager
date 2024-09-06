# Dockerfile for Express API server
FROM node AS development

WORKDIR /usr/src/app

# Copy the app package and package-lock.json file
COPY package*.json .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

# Start the app using serve command
CMD [ "npm", "start" ]