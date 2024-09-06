import { Request, Response, NextFunction } from 'express';
import { createTask, editTask, deleteTask, getTaskById, getTasks } from '../controllers/task';
import { Task } from '../models/task';

// Mock the Task model
jest.mock('../models/task');

describe('Task Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  const mockTask = { _id: '1', title: 'Task 1', description: 'Task description', status: 'pending' };

  it('should create a new task', async () => {
    (Task.prototype.save as jest.Mock).mockResolvedValue(mockTask);

    req.body = { title: 'Task 1', description: 'Task description', status: 'pending' };
    await createTask(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: mockTask });
  });

  it('should return a task by ID', async () => {
    (Task.findById as jest.Mock).mockResolvedValue(mockTask);

    req.params = { id: '1' };
    await getTaskById(req as Request, res as Response, next);

    expect(Task.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockTask });
  });

  it('should return 404 if task is not found', async () => {
    (Task.findById as jest.Mock).mockResolvedValue(null);

    req.params = { id: '1' };
    await getTaskById(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });

  it('should return all tasks', async () => {
    const mockTasks = [mockTask, { _id: '2', title: 'Task 2', description: 'Description 2', status: 'completed' }];
    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    await getTasks(req as Request, res as Response, next);

    expect(Task.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockTasks });
  });

  it('should update a task', async () => {
    const updatedTask = { _id: '1', title: 'Updated Task', description: 'Updated description', status: 'completed' };
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

    req.params = { id: '1' };
    req.body = { title: 'Updated Task', description: 'Updated description', status: 'completed' };
    await editTask(req as Request, res as Response, next);

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: updatedTask });
  });

  it('should delete a task', async () => {
    (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTask);

    req.params = { id: '1' };
    await deleteTask(req as Request, res as Response, next);

    expect(Task.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted successfully' });
  });
});
