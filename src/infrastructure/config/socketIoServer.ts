// socketIoServer.ts
import { Server as SocketServer } from 'socket.io';
import { Server } from 'http';

// Define the User type
interface User {
    userId: string;
    socketId: string;
}

let users: User[] = [];

const addUser = (userId: string, socketId: string): void => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
}

const removeUser = (socketId: string): void => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId: string): User | undefined => {
    return users.find(user => user.userId === userId);
}
const fa = ()=>{
    console.log('sokcettttt')
}
fa()

const initSocketServer = (server: Server): void => {
    const io = new SocketServer(server, {
        
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.on("addUser", (userId: string) => {
            addUser(userId, socket.id);
            io.emit('getUser', users);
        });

        socket.on("sendMessage", ({ senderId, receiverId, text }: { senderId: string, receiverId: string, text: string }) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit('getMessage', { senderId, text });
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            removeUser(socket.id);
            io.emit('getUser', users);
        });
    });
}

export default initSocketServer;
