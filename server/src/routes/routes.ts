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
    editUser,
    deleteUser,
} from '../controllers/user';

import { authorized, signUp, signIn, signOut } from '../middleware/auth';

const route = Router();

route.post('/signup', signUp);
route.post('/login', signIn);
route.post('/signout', signOut);

route.get('/task/:id', getTaskById);
route.get('/tasks', getTasks);
route.post('/task', createTask);
route.put('/task/:id', editTask);
route.delete('/task/:id', deleteTask);

route.get('/user/:id', getUserById);
route.get('/users', getUsers);
route.put('/user/:id', editUser);
route.delete('/user/:id', deleteUser);

export default route;