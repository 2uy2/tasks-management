const taskRoutes = require("./task_route")
const userRoutes = require("./user_router")


module.exports = (app) => {
    const version = "/api/v1"
    app.use(version+"/tasks",taskRoutes)
    app.use(version+"/users",userRoutes)

};