const express = require("express");
const database = require("./config/database");
const bodyParser = require('body-parser'); // dùng để giúp đọc và hiểu dữ liệu mà client gửi lên server. ở dạng json (req.body)
var cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();


const routesApiVer1 = require("./api/v1/routes/index_route")
const app = express();
const port = process.env.PORT;

app.use(cors())

database.connect();

app.use(cookieParser())

//parse application/json (áp dụng cho dạng dữ liệu json)
app.use(bodyParser.json())

//routes ver 1
routesApiVer1(app);

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})