const { validationResult } = require("express-validator");
const UserModel = require("../model/User");
const { success, failure } = require("../util/common");
const HTTP_STATUS = require("../constants/statusCodes");


class User {
    async getAll(req, res) {
      try {
        const users = await UserModel.find({});
        console.log(users);
        if(users.length>0){
            return res.status(HTTP_STATUS.OK).send(success("Successfully got all the users", { users, total: users.length }));
        } else {
            return res.status(HTTP_STATUS.OK).send(success("No users were found"));
        }
      } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
      }
    }
  
    async getById(req, res) {
      try {
        const { id } = req.params;
        const user = await UserModel.findById({ _id: id });
        if (user) {
            return res.status(HTTP_STATUS.OK).send(success("Successfully received the user", user));
        } else {
            return res.status(HTTP_STATUS.OK).send(failure("Failed to received the user"));
        }
      } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
      }
    }

    // using express-validator
    async addProduct(req, res) {
      try {
        const validation = validationResult(req).array();
        console.log(validation);
        if(validation.length > 0) {
        //   return res.status(422).send(failure("Invalid properties", validation));
          return res.status(HTTP_STATUS.OK).send(failure("Failed to add the user", validation));
        }
        else {
            // const {name, email, role, personal_info{age, address}} = req.body;
            const { name, email, role, age, address } = req.body;
            const user = new UserModel({ name, email, role, age, address});
            await user
                .save()
                .then((data) => {
                    return res.status(HTTP_STATUS.OK).send(success("Successfully added the user", data));
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure("Failed to add the user"));
                });
            // console.log(result);
            // if(result.success) {
            //     return res.status(201).send( success("Successfully added the product",result.data));
            // } else{
            //     // console.log();
            //     return res.status(304).send( failure("Product could not be added"));
            // }
        }
      } catch (error) {
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
      }
    }


    async getOneBy(req, res) {
        // for (let record of records) {
        //     let found = false
        //     for (let key in filters) {
        //         if (record[key] === filters[key]) {
        //             found = true
        //         }
        //     }
        //     if (found) {
        //         return res.status(HTTP_STATUS.OK).send(success("Successfully received the user", found));
        //     }
                
        // }

        try {
            const { filters } = req.query;
            console.log(filters);
            const users = await UserModel.find({});
            console.log(users);
            if(users.length>0){
                return res.status(HTTP_STATUS.OK).send(success("Successfully got the users", { users, total: users.length }));
            } else {
                return res.status(HTTP_STATUS.OK).send(success("No users were found"));
            }
          } catch (error) {
                console.log(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error in"));
          }
    }
    
    // async getByCategory(req, res) {
    //   try {
    //     const validation = validationResult(req).array();
    //     console.log(validation);
    //     if(validation.length > 0) {
    //       return res.status(422).send(failure("Invalid properties", validation));
    //     } else {
    //       const { category } = req.query;
    //       console.log(category);
    //       const result = await ProductModel.getByCategory(category);
    //       console.log(result);
    //       if(result.success) {
    //           return res.status(200).send( success( "The products with the category has been found", result.data));
    //       } else if(result.error){
    //           return res.status(404).send( failure( "No product exists with that category", result.error));
    //       } else{
    //           return res.status(404).send( failure( "The products could not be found"));
    //       }
    //     }
    //   } catch (error) {
    //       return res.status(500).send( failure( "Internal server error" ));
    //   }
    // }
  
  
  }
  
  module.exports = new User();

