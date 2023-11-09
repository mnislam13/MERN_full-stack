const { validationResult } = require("express-validator");
const OrderModel = require("../model/Order");
const { success, failure } = require("../util/common");
const HTTP_STATUS = require("../constants/statusCodes");

class Order {
  async getAll(req, res) {
    try {
      const orders = await OrderModel.find({})
        .populate("user", "name")
        // .populate("books.bookISBN")
        .populate("books.book");
      console.log(orders);
      if (orders.length > 0) {
        return res.status(HTTP_STATUS.OK).send(
          success("Successfully got all the orders", {
            orders,
            total: orders.length,
          })
        );
      } else {
        return res.status(HTTP_STATUS.OK).send(success("No orders were found"));
      }
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal server error from getAll"));
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.findOne({ _id: id })
        .populate("user", "name")
        .populate("books.book");
      console.log(order);

      const orderedBooks = order.books;
      console.log(orderedBooks);
      var priceArr = [];
      orderedBooks.forEach(function (data, index, jsonData) {
        priceArr.push(data.book.price * data.quantity);
      });
      const totalPrice = priceArr.reduce(
        (total, current) => total + current,
        0
      );
      console.log(totalPrice);
      const dummyTotal = { "Total price": totalPrice };
      console.log(dummyTotal);

      // const updatedOrder = {...orderedBooks, ...dummyTotal};
      const updatedOrder = { ...order._doc, ...dummyTotal };
      console.log(updatedOrder);
      if (updatedOrder) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("Successfully received the order", updatedOrder));
      } else {
        return res
          .status(HTTP_STATUS.OK)
          .send(failure("Failed to received the order"));
      }
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal server error from getById"));
    }
  }

  // using express-validator
  async addProduct(req, res) {
    try {
      const validation = validationResult(req).array();
      console.log(validation);
      if (validation.length > 0) {
        //   return res.status(422).send(failure("Invalid properties", validation));
        return res
          .status(HTTP_STATUS.OK)
          .send(failure("Failed to add the order", validation));
      } else {
        // const {name, email, role, personal_info{age, address}} = req.body;
        const { user, orders } = req.body;
        const order = new OrderModel({ user, orders });
        await order
          .save()
          .then((data) => {
            return res
              .status(HTTP_STATUS.OK)
              .send(success("Successfully added the order", data));
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
              .send(failure("Failed to add the order"));
          });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal server error from add"));
    }
  }

  async filterByQuery(req, res) {
    try {
      console.log("exec..");
      const { email } = req.query;
      const order = await OrderModel.find(req.query);
      if (order) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("Successfully received matched orders", order));
      } else {
        order;
        return res
          .status(HTTP_STATUS.OK)
          .send(failure("Failed to received the order"));
      }
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal server error from getByQuery"));
    }
  }

  async create(req, res) {
    try {
      const { userId, cartId } = req.body;
      const cart = await CartModel.findOne({ _id: cartId, user: userId });

      if (!cart) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(failure("Cart was not found for this user"));
      }
      const productsList = cart.products.map((element) => {
        return element.product;
      });

      const productsInCart = await ProductModel.find({
        _id: {
          $in: productsList,
        },
      });

      if (productsList.length !== productsInCart.length) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(failure("All products in cart do not exist"));
      }

      productsInCart.forEach((product) => {
        const productFound = cart.products.findIndex(
          (cartItem) => String(cartItem.product._id) === String(product._id)
        );
        if (product.stock < cart.products[productFound].quantity) {
          return res
            .status(HTTP_STATUS.NOT_FOUND)
            .send(
              failure(
                "Unable to check out at this time, product does not exist"
              )
            );
        }
        product.stock -= cart.products[productFound].quantity;
      });

      const bulk = [];
      productsInCart.map((element) => {
        bulk.push({
          updateOne: {
            filter: { _id: element },
            update: { $set: { stock: element.stock } },
          },
        });
      });

      const stockSave = await ProductModel.bulkWrite(bulk);
      const newTransaction = await TransactionModel.create({
        products: cart.products,
        user: userId,
        total: cart.total,
      });

      cart.products = [];
      cart.total = 0;
      const cartSave = await cart.save();

      if (cartSave && stockSave && newTransaction) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("Successfully checked out!", newTransaction));
      }

      return res.status(HTTP_STATUS.OK).send(failure("Something went wrong"));
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal server error"));
    }
  }
}

module.exports = new Order();
