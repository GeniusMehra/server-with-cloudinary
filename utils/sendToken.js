
export const sendToken=async(res,user,statusCode,message)=>{

    const token= user.getJWTToken();
    res.status(statusCode)
    .cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 1000*60*60*24)
    })
    .json({
        success:true,
        message:message,
        user:user
    })

}