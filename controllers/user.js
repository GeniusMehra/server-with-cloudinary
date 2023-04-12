import { User } from "../models/user.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from 'cloudinary'
import fs from 'fs'

export const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const avatar=req.files.avatar.tempFilePath;
        console.log("everything getting uploaded")

        if(!name || !email || !password){
            return res.status(404).json({
                success:false,
                message:"Give all the necesssary details"
            })
        }

        if(!avatar){
            return res.status(404)
            .json({
                success:false,
                message:"Send image"
            })
        }

        let user=await  User.findOne({email});
        if(user){
            return res.status(404).json({
                success:false,
                message:"The User already exists"
            })
        }
        console.log("Hello till here")

        const myCloud=await cloudinary.v2.uploader.upload(avatar,{
            folder:"todoApp",
        });

        fs.rmSync("./tmp",{recursive:true})

       user= await User.create({
            name:name,
            email:email,
            password:password,
            avatar:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            }
        })

        sendToken(res,user,200,"Successfully Registered")
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success:false,
            message:"The user doesn't exist"
        })
    }

    const isMatch= user.compare(password);
    sendToken(res,user,200,"Logged In Successfully")
    }
    catch(error){
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const logout=async(req,res)=>{
    res.status(200)
    .cookie("token","",{
        expires:new Date(Date.now())
    })
    .json({
        success:true,
        message:"Logged Out successfully"
    })
}

export const getProfile=async(req,res)=>{
    try {
        res.status(200)
        .json({
            success:true,
            message:"This is profile",
            user:req.user
        })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const updateName=async(req,res)=>{
    try {
        const {name}=req.params;
        const user = await User.findById(req.user._id);
        user.name=name;
        await user.save();
        res.status(200)
        .json({
            success:true,
            message:"name updated"
        })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}


export const temporary=async(req,res)=>{

    const avatar=req.files.avatar.tempFilePath;
    console.log(avatar)
    res.send("done")
}