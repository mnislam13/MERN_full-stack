const express = require("express");
const routes = express();
const CartController = require("../controller/Cart");
const validation = require("../middleware/ExpressValidator");


routes.post('/add-to-cart', validation.cart, CartController.addToCart);
routes.put('/remove-from-cart', validation.cart, CartController.removeFromCart);
routes.post('/checkout-cart', validation.checkoutCart, CartController.checkoutCart);
// routes.get("/all", CartController.getAll);


module.exports = routes;