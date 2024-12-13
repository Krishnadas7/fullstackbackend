// server.ts
import { app } from './infrastructure/config/app';
import dbConnection from './infrastructure/config/db';
import initSocketServer from './infrastructure/config/socketIoServer';
import http from 'http';
import { Req, Res } from './infrastructure/types/expressTypes';
// import {redisClient} from './infrastructure/config/redis' 


// redisClient.get('companyData')
const PORT = process.env.PORT || 3003; // Ensure the port is correctly set here
const server = http.createServer(app);

// Initialize the Socket.io server
initSocketServer(server);

const start = () => {
    app.get('/api/user', (req: Req, res: Res) => {
        res.send('Project started');
    });

    server.listen(PORT, async () => {
        console.log(`Service connected on http://localhost:${PORT}`);
        dbConnection();
    });
}

start();
