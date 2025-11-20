const express = require("express")
const router = express.Router();
const Task=require("../../../model/task_model");
// const controller = require("../../controllers/admin/task_controller");

// get /api/v1/tasks
router.get("/",async(req,res)=>{
    const find = {
        deleted:false
    }
    //status
    if (req.query.status){
        find.status=req.query.status
    }
    //end status
    console.log(req.query);
    //sort
    sort={};
    if (req.query.sortKey &&req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue
    }
    //end sort
    const tasks = await Task.find(find).sort(sort)
    
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