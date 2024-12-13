// server.js or app.js
import dotenv from 'dotenv';
import express from 'express';
import userRouter from '../routes/userRoute';
import adminRoute from '../routes/adminRoute';
import companyRoute from '../routes/companyRoute';
import conversationRoute from '../routes/conversationRoute';
import messageRoute from '../routes/messageRoute';
import errorHandler from '../../usecase/handler/errorHanadler';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
// import {sample} from './croneJob'
// sample()
import { sendingEmail } from '../../usecase/usecase/croneJob/croneJob';
// sendingEmail()
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const app = express();


const ORIGN_URL = process.env.CORS_ORIGN
app.use(cors({
    origin: ORIGN_URL,
    credentials: true // Allow cookies to be sent along with requests
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const USER_API = process.env.USER_API

app.use(USER_API as string, userRouter);

const ADMIN_API = process.env.ADMIN_API

app.use(ADMIN_API as string, adminRoute);

const COMPANY_API = process.env.COMPANY_API

app.use(COMPANY_API as string, companyRoute);

const CONVERSATION_API = process.env.CONVERSATION_API

app.use(CONVERSATION_API as string, conversationRoute);

const MESSAGE_API = process.env.MESSAGE_API

app.use(MESSAGE_API as string, messageRoute);

app.use(errorHandler);

// Initialize the Socket.io server

// Listen on a port defined in your environment variables or default to 5000

