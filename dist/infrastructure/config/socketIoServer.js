"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// socketIoServer.ts
const socket_io_1 = require("socket.io");
let users = [];
const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find(user => user.userId === userId);
};
const fa = () => {
    console.log('sokcettttt');
};
fa();
const initSocketServer = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit('getUser', users);
        });
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
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
};
exports.default = initSocketServer;
