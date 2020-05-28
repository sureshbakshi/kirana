
const { authJwt } = require("../middlewares");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/auth/createCategory", [authJwt.verifyToken, authJwt.isAdmin], controller.createCategory);
    app.get("/api/auth/getCategories", [authJwt.verifyToken, authJwt.isAdmin], controller.getCategories)
    
};