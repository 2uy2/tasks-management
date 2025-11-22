const mongoose = require("mongoose");
const generate = require("../../../helper/generate");
const forgotPasswordSchema = new mongoose.Schema(
    
    {
        email:String,
        otp:{
            type:String,
            default:generate.generateRandomNumber(8)
        },
        expireAt:{ //xét hạn sử dụng
            type:Date,
            expires:0
        }
    },
    
    {
    
    
    timestamps: true // thời gian khởi tạo
    }
);
const ForgotPassword = mongoose.model("ForgotPassword",forgotPasswordSchema, "forgot-password");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = ForgotPassword;