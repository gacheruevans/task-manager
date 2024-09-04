import express from 'express';
import routes from './routes/routes';
import { PORT } from './config/config';
import { connectDB } from './config/db';

const app = express();

app.use('/api', routes);

app.get('/', (req, res)=> {
    return res.status(200).json({message: "Welcome to the tasking API"});
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;