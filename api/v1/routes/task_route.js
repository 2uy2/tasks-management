const express = require("express")
const router = express.Router();
const Task=require("../../../model/task_model");
// const controller = require("../../controllers/admin/task_controller");

// get /api/v1/task
router.get("/",async(req,res)=>{
    const find = {
        deleted:false
    }
    console.log(req.query);
    if (req.query.status){
        find.status=req.query.status
    }
    const tasks = await Task.find(find)
    
    res.json(tasks);
});
//get api/v1/tasks/detail/:id
router.get("/detail/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const task=await Task.findOne({
        _id:id,
        deleted:false
    })
    res.json(task);
        
    } catch (error) {
        res.json("không tìm thấy")
    }
});


module.exports = router;