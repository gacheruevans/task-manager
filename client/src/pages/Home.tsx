import React, { useContext } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import SocketContext from '../contexts/socket';
import Navbar from '../components/Navbar';

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { socket, uid, users } = useContext(SocketContext).SocketState;
  return (
    <>
      <div className='flex flex-col  w-full'> 
        <Navbar />
        <div className='w-full gap-y2-2 mx-auto px-20'>
          <div className='top-2 font-light text-sm'>
            <h2>Socket IO Information</h2>
            <p>
              Your user ID: <strong>{uid}</strong><br/>
              User Online: <strong>{users.length}</strong><br/>
              Socket ID: <strong>{socket?.id}</strong><br/>
            </p>
          </div>
          <div className='top-8'>
            <h1 className='text-2xl font-bold mb-4'>Task List</h1>
            <AddTask />
            <TaskList />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home