# Dockerfile for Express API server
FROM node

# The /app directory should act as the main application directory
WORKDIR /server

# Copy the app package and package-lock.json file
COPY package.json ./
COPY tsconfig.json ./

# Copy local directories to the current local directory of our docker image (/server)
COPY ./src ./src
COPY ./dist ./dist
COPY ./.env ./.env

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build 

EXPOSE 6050

# Start the app using serve command
CMD [ "npm", "start" ]