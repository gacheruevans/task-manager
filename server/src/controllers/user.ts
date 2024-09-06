import { Request, Response, NextFunction } from 'express';
import  { User }  from '../models/user';

export const getUserById = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message: "User does not exist."});
    } catch (error) {
        next(error);
    }
};

export const getUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchUsers = await User.find();
        if(!fetchUsers) return res.status(404).json({message: "No Users found."});
        return res.status(200).json({data: fetchUsers});
    } catch (error) {
        next(error);
    }
};

export const editUser = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    try {
        const updatedUserDetails = await User.findById(id, updates, options);
        if(!updatedUserDetails) return res.status(404).json({message: "User not found."})
        return res.status(200).json({data: updatedUserDetails});
    } catch(error){
        next(error);
    }
};

export const deleteUser  = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const deleteRecord = await User.findByIdAndDelete(id);
        if(!deleteRecord) return res.status(404).json({message: "User not found."})
        return res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
};