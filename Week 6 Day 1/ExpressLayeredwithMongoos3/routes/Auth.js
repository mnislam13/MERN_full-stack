const express = require("express");
const routes = express();
const AuthController = require("../controller/AuthController");
const validation = require("../middleware/ExpressValidator");



routes.post('/signup', validation.signup, AuthController.signup);
routes.post('/login', validation.login, AuthController.login);



module.exports = routes;