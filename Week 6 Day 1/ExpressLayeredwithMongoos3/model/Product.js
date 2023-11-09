const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { success, failure } = require("../util/common");
const productDataPath = path.join(__dirname, "..", "data", "products.json");
const usersDataPath = path.join(__dirname, "..", "data", "users.json");
const booksDataPath = path.join(__dirname, "..", "data", "books.json");
const bookOrdersDataPath = path.join(__dirname, "..", "data", "bookorders.json");



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

  async getById(id) {
    console.log(id);

    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        
        let jsonData = JSON.parse(data);
        console.log(jsonData);
        // const foundData = jsonData.find(element => element.id === id);
        const foundData = jsonData.filter((element) => element.id === id)[0];
        console.log(foundData);
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

  async addProduct(product) {
    // const { title, description, price, stock, category} = product;
    // const errors = {};
    
    // if(!title || title === ""){
    //   errors.title="Add a title";
    // }
    // if(!description){
    //   errors.description="Add a description";
    // }
    // if (description) {
    //   if (description.length < 30) {
    //     errors.description="Description should be atleast 30 characters long";
    //     // dummy description: 
    //     // For 2023, Samsung has refined its flagship smartphone. 
    //     // For 2023, Samsung has refined its flagship smartphone.
    //   } 
    // }
    // if(!price){
    //   errors.price="Price is not provided";
    // }
    // if (price) {
    //   if (price <= 50) {
    //     errors.price="Price should be more than 50";
    //   } 
    // }
    // if(!stock || stock <=0){
    //   errors.stock="Add some stock";
    // }
    // if(!category || category === ""){
    //   errors.category="Add a category";
    // }

    // if (Object.keys(errors).length > 0) {
    //     // console.log(errors);
    //   return { success: false, errors: errors};
    // }
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

  async calculateStock() {
    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        let jsonData = JSON.parse(data);
        var stockArr = [];
        jsonData.forEach(function (data, index, jsonData) {
            stockArr.push(data.stock);
        });
        // console.log(stockArr);
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

  async getByCategory(category) {
    console.log(category);

    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        
        let jsonData = JSON.parse(data);
        // const foundData = jsonData.find(element => element.id === id);
        const foundData = jsonData.filter((element) => element.category === category);
        console.log(foundData);
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

  async updatePriceByDiscount(category, discount) {
    return fsPromise
      .readFile(productDataPath, { encoding: "utf-8" })
      .then((data) => {
        let flag = false;
        let jsonData = JSON.parse(data);
        const updatedData = jsonData.map(obj => {
          if (obj.category === category) {
            flag = true;
            const discountedPrice = Math.ceil(obj.price - ((obj.price/100)*discount));
            const dummyProduct = {"discounted price": discountedPrice};
            console.log(dummyProduct);
            return {...obj, ...dummyProduct};
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

  async createReceipt(orderId) {
    console.log(orderId);
    const receipt = [];
    return fsPromise
      .readFile(bookOrdersDataPath, { encoding: "utf-8" })
      .then((data) => {
        
        let jsonData = JSON.parse(data);
        // const foundData = jsonData.filter((element) => element.orderId === orderId)[0];
        const jsonOrders = jsonData.filter((element) => {
          if(element.orderId === orderId){
            return fsPromise
              .readFile(booksDataPath, { encoding: "utf-8" })
              .then((data) => {

                let jsonBooks = JSON.parse(data);
                for(const book of jsonBooks) {
                  if(jsonOrders.bookISBN.includes(book.bookISBN)) {
                    element.push(book);
                  }
                }
                return element;
                // const updatedData = jsonBooks.map(obj => {
                //   if (obj.bookISBN === element.bookISBN) {
                //     element =  {...element, ...obj};
                //   }
                //   // return obj;
                //   return element;
                //   });
                })    
                .catch((error) => {
                  return { success: false };
              });
            
          }
        });
          // {
          //   console.log(obj);
          //   flag = true;
          //   // const dummyReceipt = {
          //   //   "Order Id": obj.orderId,
          //   //   "Book purchased": obj.bookCount,
          //   //   "Total price": obj.price,
          //   //   "Date to deliver": obj.deliveryDate
          //   // };
          //   // console.log(dummyReceipt);

          //   // return {...obj, ...dummyReceipt};
          // }
          // return obj;
          // return dummyReceipt;
        // });
        console.log(jsonOrders);
        if (jsonOrders) {
          // If data is found with the corresponding ID, then only that data will be returned
          return { success: true, data: jsonOrders };
        }
        return { success: false, error: 404 };
      })
      .catch((error) => {
        // console.log(error);
        return { success: false };
      });
  }

}

module.exports = new Product();
