import React, { useContext } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import SocketContext from '../contexts/socket';

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;
  return (
    <div className='flex flex-col gap-y2-2 mx-auto mt-10 px-20'>
      <div>
        <h2>Socket IO Information</h2>
        <p>
          Your user ID: <strong>{uid}</strong><br/>
          User Online: <strong>{users.length}</strong><br/>
          Socket ID: <strong>{socket?.id}</strong><br/>
        </p>
      </div>
      <h1 className='text-2xl font-bold mb-4'>Task List</h1>
      <AddTask />
      <TaskList />
    </div>
  )
}

export default Home