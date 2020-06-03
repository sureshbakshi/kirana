
const { authJwt } = require("../middlewares");
const controller = require("../controllers/unit.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/auth/createUnit", [authJwt.verifyToken, authJwt.isAdmin], controller.createUnit);
    app.get("/api/auth/getUnits", [authJwt.verifyToken, authJwt.isAdmin], controller.getUnits)
    
};