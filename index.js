import express from "express";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import userRouter from './routes/user.js'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from 'cloudinary'
import cors from 'cors'
import passport from "passport";
import session from "express-session";

config({
    path:"./data/config.env"
})

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

connectDB();

const app=express();
app.use( session({
    secret: "12sdf5",
    resave: true,
    saveUninitialized: true
  }));
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    limits:{fileSize:5*1024*1024},
    useTempFiles:true
}))
app.use(cors());


app.use("/api/v1/user",userRouter);

app.listen(5000,()=>{
    console.log(`Server is working on Port ${process.env.PORT}`)
})