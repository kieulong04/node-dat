import User from "../model/user"
import { registerSchema, signinSchema  } from "../schemas/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup =  async(req,res)=>{
   //lấy dữ liệu từ user gửi lên
   const { userName, password, confirmPassword, email, age} = req.body;
   // Kiểm tra xem dữ liệu có hợp lệ hay không
   const {error} =  registerSchema.validate(req.body,{abortEarly:false});
   if(error){
    const message =  error.details.map((message)=>message.message);
    return res.status(400).json({
        message,
    })
   }
   // kiểm tra xem user đã tồn tại hay chưa
   const existUser = await User.findOne({email});
   if(existUser){
        return res.status(400).json({
            message: ["Email đã tồn tại"],
        })
   }
   //mã hóa mật khẩu sử dụng bcryptjs
   const hashedPassword =  await bcryptjs.compare(password, user.password);
//    console.log("hashedPassword", await bcryptjs.hash(password,10));
   //lưu user vào database
   const user = await User.create({
    userName,
    email,
    password:hashedPassword,
    age
   })
   // trả về thông tin user đã đăng kí ( không gửi về mật khẩu )
   user.password = undefined;
   console.log(user.userName)
   return res.status(201).json({
    user,
   })
};

export const singin =  async(req,res)=>{
       //lấy dữ liệu từ user gửi lên
   const {email,password,  age} = req.body;
   // Kiểm tra xem dữ liệu có hợp lệ hay không
   const {error} =  signinSchema.validate(req.body,{abortEarly:false});
   if(error){
    const message =  error.details.map((message)=>message.message);
    return res.status(400).json({
        message,
    })
   }
   try {
    // Kiểm tra xem user đã tồn tại hay không
    const existUser = await User.findOne({ email });
    if (!existUser) {
        return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    // Kiểm tra tính hợp lệ của mật khẩu
    const isPasswordValid = await bcryptjs.compare(password, existUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo và trả về token JWT nếu mật khẩu hợp lệ
    const token = jwt.sign({ id: existUser._id }, "ma-khoa-bi-mat-88888", { expiresIn: "1w" });

    // Tạo đối tượng user không bao gồm mật khẩu
    const userWithoutPassword = {
        _id: existUser._id,
        userName: existUser.userName,
        email: existUser.email,
        age: existUser.age
    };

    return res.status(200).json({ token,userWithoutPassword });
} catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình xử lý" });
}
}