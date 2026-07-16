import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import { app, server } from './socket/socket.js';

dotenv.config();
const PORT = process.env.PORT || 8000;  


app.use(cors({
    origin:"https://chatify-chat-application-client.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)
server.listen(PORT,()=>{
     connectDB()
    console.log('server started')
})
