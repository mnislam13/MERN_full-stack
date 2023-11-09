const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const product = require("../product");
const productDataPath = path.join(__dirname, "..", "data", "products.json");
const employeeDataPath = path.join(__dirname, "..", "data", "employees.json");

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

  // Later
  // // async getByQuery(queryParams) {
  // //   for (const key in queryParams) {
  // //     // console.log(`${key} is ${queryParams[key]}`);

  // //   }
  // // }


  async addProduct(product) {
    const { title, description, price, stock, category} = product;
    const errors = {};
    
    if(!title || title === ""){
      errors.title="Add a title";
    }
    if(!description){
      errors.description="Add a description";
    }
    if (description) {
      if (description.length < 30) {
        errors.description="Description should be atleast 30 characters long";
        // dummy description: 
        // For 2023, Samsung has refined its flagship smartphone. 
        // For 2023, Samsung has refined its flagship smartphone.
      } 
    }
    if(!price){
      errors.price="Price is not provided";
    }
    if (price) {
      if (price <= 50) {
        errors.price="Price should be more than 50";
      } 
    }
    if(!stock || stock <=0){
      errors.stock="Add some stock";
    }
    if(!category || category === ""){
      errors.category="Add a category";
    }

    if (Object.keys(errors).length > 0) {
        // console.log(errors);
      return { success: false, errors: errors};
    }
    return fsPromise
        .readFile(productDataPath, { encoding: "utf-8" })
        .then((data) => {
            const jsonProductData = JSON.parse(data);
            product = { "id": jsonProductData[jsonProductData.length-1].id+1, ...product};
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

  async getById(id) {
    console.log(id);

    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        
        let jsonData = JSON.parse(data);
        // const foundData = jsonData.find(element => element.id === id);
        const foundData = jsonData.filter((element) => element.id === id)[0];
        if (foundData) {
          // If data is found with the corresponding ID, then only that data will be returned
          return { success: true, data: foundData };
        }
        return { success: false, error: 404 };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }

  async updateById(id, product) {
    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        let flag = false;
        let jsonData = JSON.parse(data);
        const updatedData = jsonData.map(obj => {
          if (obj.id === id) {
            flag = true;
            return {...obj, ...product};
          }
          return obj;
        });
        if (flag) {
          return fsPromise
            .writeFile(productDataPath, JSON.stringify(updatedData))
            .then(() => {
                return { success: true, data: updatedData };
            })    
            .catch((error) => {
                return { success: false };
            });
          // return { success: true, data: foundData };
        }
        return { success: false, error: 404 };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }


  async deleteById(id) {
    console.log(id);

    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        let jsonData = JSON.parse(data);
        // const foundData = jsonData.find(element => element.id === id);
        const foundData = jsonData.filter((element) => element.id === id)[0];
        if (foundData) {
          const updatedData = jsonData.filter((element) => element.id !== id);
          return fsPromise
            .writeFile(productDataPath, JSON.stringify(updatedData))
            .then(() => {
                return { success: true, data: updatedData };
            })    
            .catch((error) => {
                return { success: false };
            });
        }
        return { success: false, error: 404 };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }


  async calculateStock() {
    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        let jsonData = JSON.parse(data);
        var stockArr = [];
        jsonData.forEach(function (data, index, jsonData) {
            stockArr.push(data.stock);
        });
        console.log(stockArr);
        const totalStock = stockArr.reduce(
          (total, current) => total+current, 0   
        );
        console.log(totalStock);
        if (totalStock>0) {
          return { success: true, data: totalStock };
        }
        return { success: false, error: 404 };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }

  // async giveDiscount(category, discount) {
  //   console.log(category, discount);
  //   return fsPromise
  //     .readFile(productDataPath, { encoding: "utf-8" })
  //     .then((data) => {
  //       let jsonData = JSON.parse(data);
  //       let flag = false;
  //       jsonData.forEach(function (data, index, jsonData) {
  //         flag = true;
  //         console.log(data);
  //         console.log(data.price);
  //         console.log(index);
  //       });
  //       if (flag) {
  //         return { success: true, data: data };
  //       }
  //       return { success: false, error: 404 };
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       return { success: false };
  //     });
  // }

}

module.exports = new Product();
