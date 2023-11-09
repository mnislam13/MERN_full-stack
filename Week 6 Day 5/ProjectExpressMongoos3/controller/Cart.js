const { validationResult } = require("express-validator");
const CartModel = require("../model/Cart");
const BookModel = require("../model/Book");
const UserModel = require("../model/User");
const { success, failure } = require("../util/common");
const HTTP_STATUS = require("../constants/statusCodes");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require('mongodb');


class Cart {
    
    async addToCart(req, res) {
      try {
        const validation = validationResult(req).array();
        // console.log(validation);
        if(validation.length > 0) {
        //   return res.status(422).send(failure("Invalid properties", validation));
          return res.status(HTTP_STATUS.OK).send(failure("Failed to add to cart", validation));
        }
        else {

            const { user, book, quantity } = req.body;
            var userId = new mongoose.Types.ObjectId(user);
            let userRequested = await UserModel.findOne({_id: userId});
            if (!userRequested) {
                return res.status(HTTP_STATUS.OK).send(success("User does not exist"));
            }
            var bookId = new mongoose.Types.ObjectId(book);
            let bookRequested = await BookModel.findOne({_id: bookId});
            if (!bookRequested) {
                return res.status(HTTP_STATUS.OK).send(success("Book does not exist"));
            }
            let cart = await CartModel.findOne({user: user});
            if(!cart){            
                // If no cart exists, create a new one
                cart = await CartModel({ user, books: [] });
            }
            
            // console.log(cart[0]);
            console.log(cart.books);
            let flag = false;
            cart.books.forEach(function (data, index, jsonData) {
                if(data.book == book) {
                    flag = true;
                    console.log(data.quantity);
                    var newQuantity = data.quantity + quantity;
                    if(bookRequested.stock<newQuantity){
                        return res.status(HTTP_STATUS.OK).send(success("Book stock exceeded"));
                    }
                    data.quantity = newQuantity;
                } 
            });
            if(!flag) {
                cart.books.push({ book, quantity });
            }
            let bookPrice = Number(bookRequested.price)*Number(quantity);
            cart.total = bookPrice + cart.total;
            
            await cart
                .save()
                .then((data) => {
                    return res.status(HTTP_STATUS.CREATED).send(success("Successfully added to cart", data));
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Failed to add to cart"));
                });
        }
      } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error from add-to-cart"));
      }
    }




    async removeFromCart(req, res) {
        try {
          const validation = validationResult(req).array();
          // console.log(validation);
          if(validation.length > 0) {
          //   return res.status(422).send(failure("Invalid properties", validation));
            return res.status(HTTP_STATUS.OK).send(failure("Failed to remove from cart", validation));
          }
          else {

              const { user, book, quantity } = req.body;

              let cart = await CartModel.findOne({user: user});
              if(!cart){            
                return res.status(HTTP_STATUS.OK).send(success("No cart exists for the user"));
              }
              // console.log(cart[0]);
              console.log(cart.books);
              let flag = false;
              cart.books.forEach(function (data, index, jsonData) {
                  if(data.book == book) {
                      flag = true;
                      console.log(data.quantity);
                      if(data.quantity<=quantity) {
                        data.quantity = 0;
                        cart.books = cart.books.filter((item) => item.book.toString() !== book.toString());
                      } else {
                        var newQuantity = data.quantity - quantity;
                        data.quantity = newQuantity;
                      }
                      
                  } 
                  
              });
              
              if(!flag){
                return res.status(HTTP_STATUS.OK).send(success("This book does not exist in the cart"));
              }

              await cart
                  .save()
                  .then((data) => {
                      return res.status(HTTP_STATUS.ACCEPTED).send(success("Successfully removed from cart", data));
                  })
                  .catch((err) => {
                      console.log(err);
                      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Failed to remove from cart"));
                  });
          }
        } catch (error) {
              console.log(error);
              return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error from remove-from-cart"));
        }
    }

    async checkoutCart(req, res) {
        try {
          const validation = validationResult(req).array();
          // console.log(validation);
          if(validation.length > 0) {
          //   return res.status(422).send(failure("Invalid properties", validation));
            return res.status(HTTP_STATUS.OK).send(failure("Failed to add the order", validation));
          }
          else {

              const { cartId } = req.body;
              var cartID = new mongoose.Types.ObjectId(cartId);
              let cart = await CartModel.findOne({_id: cartID});

              let Books = await BookModel.find({});
                                    
              if(!cart){            
                return res.status(HTTP_STATUS.OK).send(success("No cart found with the id"));
              }
            
            // console.log(cart[0]);
            //   console.log(order.books);
            //   cart.books.forEach(async function (data, index, jsonData) {          
            //     // Use findOneAndUpdate to find and update each book by its _id
            //     const updatedBook = await BookModel.findOneAndUpdate(
            //       { _id: data.book },
            //       { $set: { stock: stock-data.quantity } },
            //     );
            //   });

            // cart.books.forEach((item) => {
            //     Books.findOneandUpdate(
            //         // {_id: item.book}, 
            //         // {$set: {stock: (stock - item.quantity)}}, 
            //         // {new:true}

            //         )
            // });


            const bookIdsToUpdate = cart.books.map((item) => item.book);
            const bookQuantityToUpdate = cart.books.map((item) => item.quantity);
            await BookModel.updateMany(
                { _id: { $in: bookIdsToUpdate } },
                { $set: { stock: (stock-{ $in: bookQuantityToUpdate }) } }
            );

            cart.checkoutStatus = 1;
            await cart
                  .save()
                  .then((data) => {
                      return res.status(HTTP_STATUS.ACCEPTED).send(success("Successfully checked out from cart", data));
                  })
                  .catch((err) => {
                      console.log(err);
                      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Failed to check out from cart"));
                  });
  
              
          }
        } catch (error) {
              console.log(error);
              return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error from checkout-cart"));
        }
    }

    
  }
  
  module.exports = new Cart();



