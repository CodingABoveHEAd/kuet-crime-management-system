import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';    
import dotenv from env;
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Api is running properly...");
});

app.use("/api/auth",authRoutes);


const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));