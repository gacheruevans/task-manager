# task-manager
Real time task manager app.
==========================
## Description.
This is a simple task manager application that allows users to create, read, update and delete tasks.

### Approach.
I chose a microservices approach as opossed to monolith structure because,
 - Independent Deployment: Services can be developed, deployed, and scaled independently, allowing for greater flexibility.
 - Fault Isolation: A failure in one service is less likely to affect others, improving overall system resilience.
 - Scalability: Easier to scale individual services based on demand rather than scaling the entire system.
 - Agile Development: Smaller, autonomous teams can work on different services concurrently, speeding up development cycles.

## Frontend
### Setup
1. Clone the repository.
2. CD into client directory.
3. Install the required packages by running `npm install`
4. Create a new file called `.env` in the root directory and add the following line:
5. Ensure yoou have docker installed in your machine and run
    `docker compose build`
6. Then `docker compose up` to deploy the project on docker.
7. Open your browser and navigate to `http://localhost:3000` to access the application

### Tests

## Backend
### Setup
1. Clone the repository.
2. CD into server directory.
3. Install the required packages by running `npm install`
4. Create a new file called `.env` in the root directory and add the following line:
5. Ensure yoou have docker installed in your machine and run
    `docker compose build`
6. Then `docker compose up` to deploy the project on docker.
7. Open your browser and navigate to `http://localhost:5000` to access the application
