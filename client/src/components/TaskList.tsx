import React from 'react';
import { useTasks } from '../contexts/task';

const TaskList = () => {
    const {tasks, toggleTask} = useTasks();
    return(
        <div className='mt-4'>
            {tasks.map((task: { completed: boolean | undefined; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; completedAt: string | number | Date; }, index: React.Key | null | undefined) => (
                <div key={index}>
                    <input 
                        type='checkbox' 
                        checked={task.completed} 
                        onChange={()=> {toggleTask(index)}} 
                        className='form-checkbox h-5 w-5'    
                    />
                        <label className={`ml-2 text-lg flex-1 ${task.completed ? 
                            'text-gray-400 line-through' : 'text-black'}`}>{task.text}</label>
                        
                        {
                            task.completed && task.completedAt && (
                                <span className='text-sm text-gray-500 p-4'>
                                    Completed At: {new Date(task.completedAt).toLocaleString()}
                                </span>
                            )
                        }
                </div>
            ))}
        </div>
    );

};
export default TaskList;