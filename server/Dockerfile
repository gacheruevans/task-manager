# Dockerfile for Express API server
FROM node:16-alpine AS development

WORKDIR /usr/src/app

# Copy the app package and package-lock.json file
COPY package*.json .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 

COPY . .

RUN npm run build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN  npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

# Start the app using serve command
CMD [ "node", "dist/index.js" ]