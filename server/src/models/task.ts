import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
