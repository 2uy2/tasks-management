const md5 = require("md5");
const User = require("../model/user_model")
const generateHelper = require("../../../helper/generate");
const sendMailHelper = require("../../../helper/sendMail")
const ForgotPassword = require("../model/forgot-password_model")
//post /api/v1/users/register
module.exports.register = async (req, res) => {

    req.body.password = md5(req.body.password);
    console.log(req.body);
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if (existEmail) {
        res.json({
            code: 400,
            message: "email đã tồn tại"
        })
    } else {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password
        })


        user.save();
        const token = user.token;
        res.cookie("token", token); //tạo cookie cho fe, vì cookie lưu được cả trên server và fe  
        res.json({
            code: 200,
            message: "tạo tài khoản thành công",
            token: token
        })
    }
}
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        res.json({
            code: 400,
            message: "email không tồn tại"
        })
        return;
    }
    if (md5(password) != user.password) {
        res.json({
            code: 400,
            message: "sai mật khẩu"
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token)
    res.json({
        code: 400,
        message: "đăng nhập thành công",
        token: token
    })

}
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        res.json({
            code: 400,
            message: "email không tồn tại"
        })
        return;
    }
    const otp = generateHelper.generateRandomNumber(8); //tạo mã otp có 8 số
    //lưu data và database
    const timeExpire = 5;
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()+timeExpire*60//thời hạn 5 phuts
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    
    await forgotPassword.save();
    const expire = forgotPassword.expireAt.getTime();
    //gửi otp qua email 
    const subject = `Mã OTP xác xinh lấy lại mật khẩu`;
    const html = `
            Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là ${timeExpire} phút. Lưu ý không được để lộ mã OTP
        `
    sendMailHelper.sendMail(email, subject, html);

    res.json({
        code: 200,
        message:"đã gửi mã otp qua email"
    })
}