const express = require("express")
const router = express.Router();
const Task = require("../../../model/task_model");
const controller = require("../controller/task_controller");

// get /api/v1/tasks
router.get("/", controller.index);
//get api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail)



module.exports = router;