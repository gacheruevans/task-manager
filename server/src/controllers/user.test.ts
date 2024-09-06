import { Request, Response, NextFunction } from 'express';
import { getUserById, getUsers, editUser, deleteUser } from './user';
import { User } from '../models/user';

// Mock the User model
jest.mock('../models/user');

describe('User Controller', () => {
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

  const mockUser = { _id: '1', name: 'John Doe' };

  it('should return a user by ID', async () => {
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    req.params = { id: '1' };
    await getUserById(req as Request, res as Response, next);

    expect(User.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUser });
  });

  it('should return 404 if user is not found', async () => {
    (User.findById as jest.Mock).mockResolvedValue(null);

    req.params = { id: '1' };
    await getUserById(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User does not exist.' });
  });

  it('should return all users', async () => {
    const mockUsers = [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Jane Doe' }];
    (User.find as jest.Mock).mockResolvedValue(mockUsers);

    await getUsers(req as Request, res as Response, next);

    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockUsers });
  });

  it('should update a user', async () => {
    const updatedUser = { _id: '1', name: 'Updated User' };
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

    req.params = { id: '1' };
    req.body = { name: 'Updated User' };
    await editUser(req as Request, res as Response, next);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', { name: 'Updated User' }, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: updatedUser });
  });

  it('should delete a user', async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(mockUser);

    req.params = { id: '1' };
    await deleteUser(req as Request, res as Response, next);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });
});
