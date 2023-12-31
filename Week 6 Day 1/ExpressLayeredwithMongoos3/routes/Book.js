const express = require("express");
const routes = express();
const BookController = require("../controller/Book");
const validation = require("../middleware/ExpressValidator");


routes.post('/add', validation.createBook, BookController.addProduct);
routes.get("/all", BookController.getAll);
routes.get('/book/:id', BookController.getById);
routes.get('/filter', BookController.filterByQuery);






// routes.post('/add', ProductValidation.addValidation, ProductController.addProduct);
// routes.delete('/delete/:id', ProductController.deleteById);



// routes.patch('/update', ProductValidation.updateValidation, ProductController.updateById);
// routes.get('/totalstock', ProductController.calculateStock);
// routes.get('/filter', validation.forCategory, ProductController.getByCategory);
// routes.patch('/discount/filter', validation.forCategory, validation.forDiscount, ProductController.updatePriceByDiscount);

// routes.get('/books/orders/generateReceipt', validation.forOrder, ProductController.createReceipt);



module.exports = routes;