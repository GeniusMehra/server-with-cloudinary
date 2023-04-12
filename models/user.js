import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,"Password should be at least 8 characters long"]
    },
    avatar:{
        public_id:String,
        url:String
    },
    createdAt:{
        type:Date,
        default:new Date(Date.now())
    }
})

schema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    const salt= await bcrypt.genSalt(12)
    this.password= await bcrypt.hash(this.password,salt);
    next();

})

schema.methods.getJWTToken=function(){
    return  jwt.sign({
        _id:this._id
    },process.env.JWT_SECRET,{
        expiresIn:1000*60*60*24
    })
}

schema.methods.compare=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model("User",schema);