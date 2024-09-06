import React, { useState } from 'react';
import { useTasks } from '../contexts/task';

export const AddTask = () => {
    const [text, setText] = useState('');
    const { addTask } = useTasks();

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!text.trim()) return
        addTask(text);
        setText('');
    };
  return (
    <form onSubmit={submitHandler} className='flex flex-row gap-x-2 justify-between'>
        <input 
            type='text' 
            value={text} 
            placeholder='Add a new task'
            onChange={(e)=> {setText(e.target.value)}}
            className='form-input w-full rounded-md border shadow-sm p-4'
        />
        <button type='submit' className='w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Add Task</button>
    </form>
  )
}

export default AddTask