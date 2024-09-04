import  { Router } from 'express';
import {
    getTaskById,
    getTasks,
    createTask,
    editTask,
    deleteTask
} from '../controllers/task';

import {
    getUserById,
    getUsers,
    createUser,
    editUser,
    deleteUser,
} from '../controllers/user';

import { authorized, signUp, signIn } from '../middleware/auth';

const route = Router();

route.post('/signup', signUp);
route.post('/login', signIn);

route.get('/task/:id',authorized, getTaskById);
route.get('/tasks',authorized, getTasks);
route.post('/task',authorized, createTask);
route.put('/task/:id',authorized, editTask);
route.delete('/task/:id',authorized, deleteTask);

route.get('/user/:id',authorized, getUserById);
route.get('/users',authorized, getUsers);
route.post('/user',authorized, createUser);
route.put('/user/:id',authorized, editUser);
route.delete('/user/:id',authorized, deleteUser);

export default route;