const taskRoutes = require("./task_route")
const userRoutes = require("./user_router");
const authMiddleware = require("../middlewares/auth_middlewares")


module.exports = (app) => {
    const version = "/api/v1"
    app.use(version+"/tasks",authMiddleware.requireAuth,taskRoutes)
    app.use(version+"/users",userRoutes)

};