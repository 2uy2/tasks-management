const nodemailer = require('nodemailer');
module.exports.sendMail = (email,subject,html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', //service gmail
        auth: {
            user: process.env.EMAIL_USER, //tên chủ người sở hữu
            pass: process.env.EMAIL_PASSWORD //password kết nối ứng dụng
        }
    });
    const mailOptions = {
        from: 'quytran11204@gmail.com', //email gửi
        to: email, //email nhận
        subject: subject, //chủ đề
        // text:"" //nội dụng : ở đây là kiểu text
        html: html //kiểu html để có thể in đạm in nghiêng các kiểu
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}