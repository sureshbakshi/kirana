
const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/auth/createProduct", [authJwt.verifyToken, authJwt.isAdmin], controller.createProduct);
    app.delete("/api/auth/deleteProduct/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteProduct);
    app.put("/api/auth/createProduct/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateProduct)
    app.get("/api/auth/product/:id", controller.getProductDetail)
    app.get("/api/auth/product", controller.getAllProducts);
    app.post("/api/auth/multiple-upload", [authJwt.verifyToken, authJwt.isAdmin], controller.multipleUpload);
};