import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"sTARTnOW"
    }).then((c)=>{console.log(`Database connected at ${c.connection.host}`)})
    .catch((error)=>{
        console.log(error)
    })

}