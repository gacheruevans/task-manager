import { useEffect,createContext, useContext, useState } from 'react';
 const TaskContext = createContext();

 export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState(()=>{
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        if(tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    const addTask = (text) => {
        const newTask = { text, completed:false };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((task, i) => {
            if(i === index) {
                return {...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString(): null}
            }
            return task
        })
        setTasks(newTasks)
    };

    return (
        <TaskContext.Provider value={{tasks, addTask, toggleTask}}>
            {children}
        </TaskContext.Provider>
    );
 };

 export const useTasks = () => {
    const context = useContext(TaskContext);
    return context
 };

 export default TaskContext;