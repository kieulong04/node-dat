import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    age:{
        type:Number
    }

},{timestamps:true,versionKey:false});
userSchema.index({userName:1,email:1});
export default mongoose.model("user",userSchema);