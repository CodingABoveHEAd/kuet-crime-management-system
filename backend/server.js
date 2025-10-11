import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';    

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import complaintRoutes from "./routes/complaintRoutes.js"
import analyticsRoute from "./routes/analyticsRoute.js";
import contactRoutes from "./routes/contactRoutes.js";


dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Api is running properly...");
});

app.use("/api/auth",authRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/analytics", analyticsRoute);
app.use("/api/contact", contactRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on  http://localhost:${PORT}`));