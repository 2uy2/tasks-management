const md5 = require("md5");
const User = require("../model/user_model")
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
        res.cookie("token",token);//tạo cookie cho fe, vì cookie lưu được cả trên server và fe  
        res.json({
            code: 200,
            message: "tạo tài khoản thành công",
            token: token
        })
    }
}