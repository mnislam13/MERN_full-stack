const express = require("express");
const routes = express();
const ProductController = require("../controller/Product");
const ProductValidation = require("../middleware/Validation");

routes.get("/", ProductController.getAll);
routes.post('/add', ProductValidation.addValidation, ProductController.addProduct);
routes.get('/product/:id', ProductController.getById);
routes.delete('/delete/:id', ProductController.deleteById);
routes.patch('/update', ProductValidation.updateValidation, ProductController.updateById);
routes.get('/totalstock', ProductController.calculateStock);

module.exports = routes;