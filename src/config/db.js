import mongoose from "mongoose"

export const connectDB = async (Uri)=>{
    try {
        await mongoose.connect(Uri);
    } catch (error) {
        console.log(error);
    }
}