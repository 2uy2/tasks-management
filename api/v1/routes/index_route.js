const taskRoutes = require("./task_route")


module.exports = (app) => {
    const version = "/api/v1"
    app.use(version+"/tasks",taskRoutes)

};