import User from "../models/user.model.js"
export const currentUser = async(req,res)=>{
try {
    let userId = req.userId
    let user = await User.findById(userId).select("-password")
    if(!user){
        return res.status(400)
        .json({message: "User not found"})

    }
    return res(200).json(user)

} catch (error) {
    return res.status(500)
    .json({message:`current user error ${error}`})
}
}