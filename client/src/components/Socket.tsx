import React, {PropsWithChildren, useReducer, useState, useEffect} from 'react';
import { defaultSocketContextState, SocketContextProvider, SocketReducer } from '../contexts/socket';
import { useSocket } from '../hooks/useSockets';

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
    const { children } = props;
    const [ SocketState, SocketDispatch ] = useReducer(SocketReducer, defaultSocketContextState);
    const [ loading, setLoading ] = useState(true);

    const socket = useSocket('ws://localhost:5000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 5000,
        autoConnect: false
    });

    useEffect(() => {
      // Connect to web socket
        socket.connect();

      // Save the socket in context
        SocketDispatch({ type: 'update_socket', payload: socket });

      // Start the event listeners
        StartListeners();

      // Send the handshake
        SendHanshake();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const StartListeners = () => {
      // User connected event
      socket.on('user_connected', (users: string[])=> {
        console.info('User connected, new user list received.');
        SocketDispatch({ type: 'update_users', payload: users });
      });

      // User disconnect event
      socket.on('user_connected', (uid: string)=> {
        console.info('User disconnected, new user list received.');
        SocketDispatch({ type: 'remove_user', payload: uid });
      });

      // Reconnect event
      socket.io.on('reconnect', (attempt) => {
        console.info('Reconnected attempt: ' + attempt);
      });
      // Reconnect error event
      socket.io.on('reconnect_error', (error) => {
        console.info('Reconnection error: ' , error);
      });
      // Reconnect failed event
      socket.io.on('reconnect', () => {
        console.info('Reconnected failure');
        alert('We are unable to connect to the web socket.');
      })
    };
    const SendHanshake = () => {
      console.info('Sending hanshake to server ...');
      
      socket.emit('handshake', (uid: string, users: string[]) => {
        console.log('User handshake callback message received');
        SocketDispatch({type: 'update_uid', payload:uid});
        SocketDispatch({type: 'update_users', payload:users});

        setLoading(false);
      });
    };
    
    if(loading) return <p>Loading socket IO ....</p>;
    return <SocketContextProvider value={{ SocketState, SocketDispatch}}>{children}</SocketContextProvider>;
};

export default SocketContextComponent