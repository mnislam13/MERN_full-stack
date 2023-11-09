const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const productDataPath = path.join(__dirname, "..", "data", "products.json");

class Product {
  async getAll() {
    return fsPromise
      .readFile(path.join(__dirname, "..", "data", "products.json"), {
        encoding: "utf-8",
      })
      .then((data) => {
        // console.log(data);

        let jsonData = JSON.parse(data);
        return { success: true, data: jsonData };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }

  async addProduct(product) {
    const { title, description, price, stock } = product;
    const errors = {};
    
    if (!title) {
      if (title === "") {
        errors.title="Title can not be blank";
      } else {
        errors.title="Title is not provided";
      }
    }
    if (!description) {
      if (description.length < 20) {
        errors.description="Description should be atleast 20 characters long";
        // dummy description: 
        // For 2023, Samsung has refined its flagship smartphone. 
        // For 2023, Samsung has refined its flagship smartphone.
      } else if (description === "") {
        errors.description="Description can not be blank";
      } else {
        errors.description="Description is not provided";
      }
    }
    if (!price) {
        if (price <= 50) {
          errors.price="Price should be more than 50";
        } else {
          errors.price="Price is not provided";
        }
    }
    if (!stock) {
        if (stock <= 0) {
          errors.stock = "Stock can not be zero";
        } else {
          errors.stock="Stock is not provided";
        }
    }
    if (Object.keys(errors).length > 0) {
        // console.log(errors);
      return { success: false, errors: errors};
    }
    return fsPromise
        .readFile(productDataPath, { encoding: "utf-8" })
        .then((data) => {
            let jsonProductData = JSON.parse(data);
            product = { ...product, "id": jsonProductData[jsonProductData.length-1].id+1};
            jsonProductData.push(product);
            data = JSON.stringify(jsonProductData);
            return fsPromise
                .writeFile(productDataPath, data)
                .then(() => {
                    return { success: true, data: JSON.parse(data) };
                })    
                .catch((error) => {
                    return { success: false };
                });
        })
        .catch((error) => {
            return { success: false };
        });
  }



  //   async getOneById(id) {
  //       return fsPromise
  //           .readFile(path.join(__dirname, "..", "data", "products.json"), {encoding: "utf-8"})
  //           .then((data) => {
  //               const findData = JSON.parse(data).filter((element) => element.id === Number(id))[0];
  //               return {success: true, data: data};
  //           })
  //           .catch((error) => {
  //               console.log(error);
  //               return {success: false};
  //           });
  //   }
}

module.exports = new Product();
