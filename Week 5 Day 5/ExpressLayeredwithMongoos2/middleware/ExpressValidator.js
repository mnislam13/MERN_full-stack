const { body, query } = require("express-validator");

const validator = {

    createUser: [
        body("name")
            .exists().withMessage("Name must be specified")
            .bail()
            .isString().withMessage("Name have to be a string")
            .bail()
            .custom((value, {req, res}) => {
                console.log(value);
                if(value.length <= 0) {
                    throw new Error("Name cannot be blank");
                }
                return true;
            }),
        body("email")
            .isLength({ min: 1 }).trim().withMessage("Email must be specified")
            .bail()
            .isEmail().withMessage("Enter a valid email")
            .bail(),
        body("role")
            .custom((value, {req, res}) => {
                if(value){
                    if(!(value === "customer" || value === "supplier")) {
                        throw new Error("Invalid role input");
                    }
                }
                return true;
            }),
        body("age")
            .exists().withMessage("Age must be specified")
            .bail()
            .isNumeric().withMessage("Enter a valid age")
            .custom((value, {req, res}) => {
                if(value<18) {
                    throw new Error("You do not meet the minimum age requirement");
                } else if(value>120) {
                    throw new Error("Are you still alive for real?");
                }
                return true;
            }),
        body("address")
            .exists().withMessage("Address must be specified")
            .bail()
            .isString().withMessage("Address have to be a string")
            .bail()
    ],

    createBook: [
        body("bookISBN")
            .isLength({ min: 1 }).trim().withMessage("Book ISBN must be specified")
            .bail(),
        body("bookName")
            .exists().withMessage("Book name must be specified")
            .bail()
            .isString().withMessage("Book name have to be a string")
            .bail()
            .custom((value, {req, res}) => {
                console.log(value);
                if(value.length <= 0) {
                    throw new Error("Book name cannot be blank");
                }
                return true;
            }),
    ],

    createOrder: [
        body("user")
            .exists().withMessage("User id must be specified")
            .bail()
            .isString().withMessage("User id have to be a string")
            .bail(),
        body("orders")
            .exists().withMessage("Order array must be specified")
            .bail(),
    ],

    create: [
        body("title")
            .exists()
            .bail()
            .withMessage("This request must contain the property title")
            .isString()
            .bail()
            .withMessage("Title have to be a string")
            .custom((value, {req, res}) => {
                console.log(value);
                if(value.length <= 0) {
                    throw new Error("Add a title");
                }
                return true;
            }),
        body("description")
            .exists()
            .withMessage("This request must contain the property description")
            .isString()
            .withMessage("Description have to be a string")
            .custom((value, {req, res}) => {
                console.log(value);
                if(value.length < 30) {
                    throw new Error("Description should be atleast 30 characters long");
                }
                return true;
            }),
        body("price")
            .exists()
            .withMessage("This request must contain the property price")
            .custom((value, {req, res}) => {
                if(value<=50) {
                    throw new Error("Price should be more than 50");
                }
                return true;
            }),
        body("stock")
            .exists()
            .withMessage("This request must contain the property stock")
            .custom((value, {req, res}) => {
                if(value<=0) {
                    throw new Error("Stock can not be zero");
                }
                return true;
            }),
        body("category")
            .exists()
            .withMessage("This request must contain the property category")
            .isString()
            .withMessage("Category have to be a string")
            .custom((value, {req, res}) => {
                if(!(value === "mobile" || value === "laptop")) {
                    throw new Error("Invalid category input");
                }
                return true;
            }),
    ],

    forCategory: [
        query("category")
            .notEmpty()
            .withMessage("This request url must contain a property category")
            .custom((value, {req, res}) => {
                if(!(value === "mobile" || value === "laptop")) {
                    throw new Error("Enter a valid category");
                }
                return true;
            }),
    ],

    forDiscount: [
        body("discount")
            .exists()
            .withMessage("This request must contain the property discount")
            .custom((value, {req, res}) => {
                if(value <= 0) {
                    throw new Error("Discount should not be zero percent");
                }
                return true;
            }),
    ],

    forOrder: [
        query("orderId")
            .notEmpty()
            .withMessage("This request url must contain a property category")
            .custom((value, {req, res}) => {
                if(value <= 0) {
                    throw new Error("Invalid order id");
                }
                return true;
            }),
    ],

};

module.exports = validator;