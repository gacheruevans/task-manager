import { Request, Response, NextFunction } from 'express';
import  { Task }  from '../models/task';

export const createTask = async(req: Request, res: Response, next: NextFunction) => {
    const { description } = req.body;
    try {
        const newTask = new Task({ description });
        await newTask.save();
        
        if(!newTask) return res.status(400).json({message: "Error ocurred while creating task."});
        return res.status(201).json({data: newTask});

    } catch (error) {
        next(error);
    }
};

export const editTask = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    try {
        const updatedTask = await Task.findById(id, updates, options);
        if(!updatedTask) return res.status(404).json({message: "Task not found"})
        return res.status(200).json({data: updatedTask});
    } catch(error){
        next(error);
    }
};

export const deleteTask = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const deleteRecord = await Task.findByIdAndDelete(id);
        if(!deleteRecord) return res.status(404).json({message: "Task not found"})
        return res.status(200).json({message: "Task deleted successfully"});
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if(!task) return res.status(404).json({message: "Task not found"});
    } catch (error) {
        next(error);
    }
};
export const getTasks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchTasks = await Task.find();
        if(!fetchTasks) return res.status(404).json({message: "No tasks found"});
        return res.status(200).json({data: fetchTasks});
    } catch (error) {
        next(error);
    }
};