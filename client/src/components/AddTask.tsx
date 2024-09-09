import React, { useState } from 'react';
import { useTasks } from '../contexts/task';
import axios from 'axios';
import Alert from './Alert';

export const AddTask = () => {
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  const createTask = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(!description.trim()) return
    
    addTask(description);
    setDescription('');
    
    try {
      await axios.post('http://localhost:5000/api/task', {description})
      .then((res)=> {
        if(res.status === 201) {
          setTimeout(() => {
            <Alert />
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={createTask} className='flex flex-row gap-x-2 justify-between'>
        <input 
            type='text' 
            value={description} 
            placeholder='Add a new task'
            onChange={(e)=> {setDescription(e.target.value)}}
            className='form-input w-full rounded-md border shadow-sm p-4'
        />
        <button type='submit' className='w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Add Task</button>
    </form>
  )
}

export default AddTask