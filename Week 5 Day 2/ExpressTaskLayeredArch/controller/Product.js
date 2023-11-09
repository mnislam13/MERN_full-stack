const ProductModel = require("../model/Product");
const { success, failure } = require("../util/common");

class Product {
  async getAll(req, res) {
    try {
      const result = await ProductModel.getAll();
      console.log(result);
      if(result.success) {
        if(result.data.lenght>0){
          return res.status(200).send( success("Successfully got all products", result.data));
        } else {
          return res.status(200).send( success("Successfully got all products but it cointains no data", result.data));
        }
          
      } else{
          return res.status(404).send( failure("Products not found"));
      }
    } catch (error) {

        return res.status(404).send( failure("Internal server error"));
    }
  }

  async getById(req, res) {
    try {
      // // const queryParams = getQueryParams();
      // // const result = await Product.getByQuery(queryParams);

      const { id } = req.params;
      const result = await ProductModel.getById(JSON.parse(id));
      console.log(result);
      if(result.success) {
          return res.status(200).send( success( "The product has been found", result.data));
      } else if(result.error){
          return res.status(404).send( failure( "No product exists with that id", result.error));
      } else{
          return res.status(404).send( failure( "The product could not be found"));
      }
    } catch (error) {
        return res.status(500).send( failure( "Internal server error" ));
    }
  }

  async addProduct(req, res) {
    try {
      let newProduct = req.body;
      
      const result = await ProductModel.addProduct(newProduct);
      
      console.log(result);
      if(result.success) {
          return res.status(201).send( success("Successfully added the product",result.data));
      } else{
          // console.log();
          return res.status(304).send( failure("Product could not be added"));
      }
    } catch (error) {
        return res.status(500).send( failure("Internal server error"));
    }
  }

  async updateById (req, res) {
    try {  
        const {id} = req.query;
        let updateOnProduct = req.body;
        const result = await ProductModel.updateById(JSON.parse(id), updateOnProduct);
        console.log(result);
        if(result.success) {
            return res.status(202).send( success( "The product has been updated", result.data));
        } else if(result.error){
            return res.status(404).send( failure( "No product exists with that id", result.error));
        } else{
            return res.status(304).send( failure( "Product could not be updated" ));
        }
    } catch (error) {
        return res.status(500).send( failure( "Internal server error"));
    }
  }

  async deleteById(req, res) {
    try {               
      const { id } = req.params;
      const result = await ProductModel.deleteById(JSON.parse(id));
      console.log(result);
      if(result.success) {
          return res.status(202).send( success( "The product has been deleted", result.data));
      } else if(result.error){
          return res.status(404).send( failure( "No product exists with that id", result.error));
      } else{
          return res.status(304).send( failure( "Product could not be deleted"));
      }
    } catch (error) {
        return res.status(500).send( failure( "Internal server error"));
    }
  }

  async calculateStock(req, res) {
    try {               
      // let condition = JSON.parse(body);
      
      const result = await ProductModel.calculateStock();
      console.log(result);
      if(result.success) {
        return res.status(202).send( success("The total stock remaining", result.data));
      } else if(result.error){
        return res.status(304).send( failure("The total stock has not been calculated", result.error));
      } else{
        return res.status(404).send( failure( "Error occured"));
      }
    } catch (error) {
      return res.status(500).send( failure( "Internal server error"));
    }
  }
  
}

module.exports = new Product();