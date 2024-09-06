import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

export class ServerSocket {
    public static instance: ServerSocket | undefined;
    public io: Server | undefined;

    public users: { [uid: string]: string };

    constructor(server: HTTPServer) {
        ServerSocket.instance = this;
        this.users = {}
        this.io = new Server(server, {
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*',
            }
        });

        this.io.on('connect', this.StartListeners);
        console.info('Socket IO started');
    }

    StartListeners = (socket: Socket) => {
        console.info('Message received from: ' + socket.id);

        socket.on('handshake', (callback:(uid:string, users: string[]) => void) => {
            console.info('Handshake received from: ' + socket.id);
            // check if this is a reconnection
            const reconnected = Object.values(this.users).includes(socket.id);

            if(reconnected) {
                console.info('This user has reconnected.');
                const uid = this.GetUidFromSockedId(socket.id);
                const users = Object.values(this.users);

                if(uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                }
            }

            // Generate new user
            const uid = v4();
            this.users[uid] = socket.id;
            const users = Object.values(this.users);

            console.info('Sending callback for handshake ...');
            callback(uid, users);

            // Send new user to all connected users
            this.SendMessage(
                'user_connected',
                users.filter((id)=> id !== socket.id),
                users
            );

        });

        socket.on('disconnect', () => {
            console.info('Disconnect recieved from: ' + socket.id);

            const uid = this.GetUidFromSockedId(socket.id);

            if(uid) {
                delete this.users[uid];
                const users = Object.values(this.users);
                this.SendMessage('user_disconnected', users);
            }
        });
    };
    
    GetUidFromSockedId = (id: string) => Object.keys(this.users).find((uid)=> this.users[uid] === id);

    /**
     * Send message through the socket
     * @param name 
     * @param users 
     * @param payload 
     */
    SendMessage = (name: string, users: string[], payload?: object) => {
        console.info('Emmitting event: '+name+ ' to ', users);
        users.forEach(id => payload ? this.io?.to(id).emit(name, payload) : this.io?.to(id).emit(name));

    }
};