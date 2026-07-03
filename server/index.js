import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;  

const app= express();

app.listen(PORT,()=>{
     connectDB()
    console.log('server started')
})