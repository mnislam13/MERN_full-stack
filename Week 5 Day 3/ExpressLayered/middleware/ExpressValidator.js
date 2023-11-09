const { body, query } = require("express-validator");

const validator = {
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