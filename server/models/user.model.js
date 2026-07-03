import mongoose,{Schema} from "mongoose";
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    }
    
},{timestamps:true})
const User = mongoose.model("User",userSchema);
export default User;