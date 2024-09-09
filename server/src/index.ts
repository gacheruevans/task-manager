import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';
import { PORT } from './config/config';
import { connectDB } from './config/db';
import { ServerSocket } from './sockets';

const app = express();

//Establish connection to the Database
connectDB(); 

// Create an HTTP server to work with both Express and Socket.IO
const httpServer = http.createServer(app);

// Start the socket
new ServerSocket(httpServer);

// Log requests
app.use((req, res, next) => {
    console.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        console.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});

// Middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Healthcheck 
app.get('/ping', (req, res, next) => {
    return res.status(200).json({ hello: 'world!' });
});

// Socket Information 
app.get('/status', (req, res, next) => {
    return res.status(200).json({ users: ServerSocket.instance?.users });
});

// Route
app.use('/api', routes);

app.get('/', (req, res)=> {
    return res.status(200).json({message: "Welcome to the tasking API"});
});

//Error handling
app.use((req, res,next) => {
    const error = new Error('Error 404! Not Found');
    res.status(404).json({message: error.message});
})

// Start backend server
httpServer.listen(PORT, () => console.info(`Backend server is running on: http://localhost:${PORT}`));
