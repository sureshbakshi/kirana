
const { authJwt } = require("../middlewares");
const controller = require("../controllers/department.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/auth/createDepartment", [authJwt.verifyToken, authJwt.isAdmin], controller.createDepartment);
    app.get("/api/auth/getDepartment", [authJwt.verifyToken, authJwt.isAdmin], controller.getDepartments)
    
};