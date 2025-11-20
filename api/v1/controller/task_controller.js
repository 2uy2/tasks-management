const Task = require("../model/task_model");
const paginationHelpers = require("../../../helper/paganiton");
const searchHelpers = require("../../../helper/search")


//get /api/v1/tasks
module.exports.index = async (req, res) => {

    const find = {
        deleted: false
    }
    //status
    if (req.query.status) {
        find.status = req.query.status
    }
    //end status
    console.log(req.query);
    //search
    // lọc tìm kiếm keyword
    const objectSearch = searchHelpers(req.query);
    // console.log(objectSearch);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    //end search

    // pagination
    const countTasks = await Task.countDocuments(find); // đếm số lượng object dữ liệu được gọi đến
    let objectPagination = paginationHelpers({
            currentPage: 1, // truyền object
            limitItems: 2,
        },
        req.query,
        countTasks
    );
    //end pagination

    //sort
    sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //end sort
    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.json(tasks);
}
//get /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id: id,
            deleted: false
        })
        res.json(task);

    } catch (error) {
        res.json("không tìm thấy")
    }
}

// patch /api/v1/tasks/changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
            _id: id,
        }, {
            status: status
        })
        res.json({
            id: id,
            code: 200,
            messeage: "cập nhật thành công"
        })
    } catch (error) {
        res.json({

            code: 400,
            messeage: "không tồn tại"
        })
    }

}

//patch /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const {
            ids,
            key,
            value
        } = req.body; //cú pháp phá vỡ cấu trúc
        console.log(ids);
        console.log(key);
        console.log(value);
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    messeage: "cập nhật thành công"
                })
                break;

            default:
                res.json({
                    code: 400,
                    messeage: "không tồn tại"
                })
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            messeage: "không tồn tại"
        })
    }


}