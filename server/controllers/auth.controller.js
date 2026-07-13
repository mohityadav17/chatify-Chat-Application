import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../db/token.js"
const signup = async (req, res) => {
    try {
        const {username,email,password}=req.body
        if([username,email,password].some(field=>typeof field !== "string" || field.trim()==="")){
            return res
            .status(400)
            .json({message:"All fields required"})
        }
    const usercreatedornot=await User.findOne({$or:[{username}, {email}]})
        if(usercreatedornot){
            return res
            .status(409)
            .json({message:"User is already existed"})

    }
    if(password.length<6){
        return res
        .status(400)
        .json({message:"Password must be at least 6 characters"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const user = await User.create({username,email,password:hashedpassword})

    const token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:false
    })
    res.status(201)
    .json(user)

} catch (error) {
        return res.status(500)
        .json({message:`Server Issue ${error}`})
    }
}
const login = async (req, res) => {
    try {
        const {email,password}=req.body
        if([email,password].some(field=>typeof field !== "string" || field.trim()==="")){
            return res
            .status(400)
            .json({message:"All fields required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res
            .status(401)
            .json({message:"Please enter valid email and password"})

    }
   
   const checkpassword = await bcrypt.compare(password,user.password)
   if(!checkpassword){
    return res.status(400)
    .json({message:"Please enter valid email and password"})
   }

    const token = await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"Strict",
        secure:false
    })
    res.status(200)
    .json(user)

} catch (error) {
        return res.status(500)
        .json({message:`Server Issue ${error}`})
    }
}
const logout = async(req,res)=>{
    try {
        res.clearCookie("token",
            {httpOnly:true,
            sameSite:"Strict",
            secure:false
        })
        res.status(200)
            .json({message:"Logged out successfully"})
        
    } catch (error) {
        return res.status(500)
        .json({message:`Server Issue ${error}`})
    }
}
const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: false
        });

        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Server Issue ${error.message}`
        });
    }
};
export {signup,login,logout,deleteUser}