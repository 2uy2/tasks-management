const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:String ,
    status:String,
    content:String,
    timeStart:Date,
    timeFinish:Date,
    createdBy:String,
    deleted :{
        type:Boolean,
        default:false // giá trị mặc định nếu người ta k xét thì sẽ là false 
    },
    deletedAt : Date // tự thêm trường dữ liệu
    },
    {
    timestamps: true // thời gian khởi tạo
    }
);
const Task = mongoose.model("Task",taskSchema, "tasks");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = Task;