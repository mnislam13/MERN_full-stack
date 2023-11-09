const port = 8000;
const http = require('http');
const path = require('path');
const {success, failure} = require("./util/common");
const Product = require("./model/product");
// const fs = require('fs');
// const querystring = require('querystring');
// const url = require('url');
// const { type } = require('os');
// let timestamp;


// this create server callback function will be executed after the server listens to any request
const server = http.createServer((req, res) => {
    const getQueryParams = () => {
        const params = new URLSearchParams(req.url.split("?")[1]);
        const queryParams = {};
        for(const param of params){
            queryParams[param[0]] = param[1];
        }
        return queryParams;
    };
    
    let body = "";
    req.on("data", (buffer) => {
        body += buffer;
    });

    req.on("end", async () => {
        // Route@ /products/all 
        // Method GET
        // console.log(req.url);
        res.setHeader("Content-Type", "application/json");
        const requestURL = req.url.split("?")[0];
        if(requestURL === "/products/all" && req.method === "GET"){
            try {
                const result = await Product.getAll();
                console.log(result);
                if(result.success) {
                    res.writeHead(200);
                    res.write(
                        JSON.stringify(
                           success("Successfully got all products", result) 
                        )
                    )
                    return res.end();
                } else{
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("Products not found")
                         )
                    )
                    return res.end();
                }
            } catch (error) {
                res.writeHead(500);
                res.write(
                    failure("Internal server error")
                );
                return res.end();
            }
        }

        // Receiving an object from client to update in the server through this route
        // Route@ /products/addProduct 
        // Method POST
        // console.log(req.url);
        else if(requestURL === "/products/addProduct" && req.method === "POST"){
            try {
                let newProduct = JSON.parse(body);
                
                const result = await Product.addProduct(newProduct);
                
                console.log(result);
                if(result.success) {
                    res.writeHead(201);
                    res.write(
                        JSON.stringify(
                           success("Successfully added the product", result) 
                        )
                    )
                    return res.end();
                } else if(result.errors) {
                    res.writeHead(201);
                    res.write(
                        JSON.stringify(
                           failure("Properties error", result.errors) 
                        )
                    )
                    return res.end();
                } else{
                    // console.log();
                    res.writeHead(304);
                    res.write(
                        JSON.stringify(
                            failure("Product could not be added.")
                         )
                    )
                    return res.end();
                }
            } catch (error) {
                res.writeHead(500);
                res.write(
                    JSON.stringify(
                        failure("Internal server error")
                    )
                );
                return res.end();
            }
        }
        // else if(req.url === "/products/addOneProduct" && req.method === "POST") {
        //     try {
        //         // validation
        //         if(body.hasAttribute('title')){
        //             res.writeHead(500, {"Content-Type": "application/json"});
        //             res.write(
        //                 JSON.stringify({message: "Product title is not mentioned!"})
        //             );
        //             return res.end();
        //         }
        //         const newProduct = JSON.parse(body);
                
                
        //         const pathData = path.join( __dirname, "data", "products.json");
        //         // console.log(newProduct);
        //         fs.readFile(pathData,
        //             (err, data) => {
        //                 if(!err) {
        //                     console.log("JSON file was read successfully.");
        //                     timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        //                     console.log(timestamp);
                            
        //                     let jsonData = JSON.parse(data);
        //                     jsonData.push(newProduct);
        //                     fs.writeFile(
        //                         pathData, JSON.stringify(jsonData),
        //                         (err, data) => {
        //                             if(!err) {
        //                                 fs.writeFileSync("./log.txt", "JSON file updated with the new product.");
        //                                 timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        //                                 fs.writeFileSync("./log.txt", timestamp);
        //                                 res.writeHead(200, {"Content-Type": "application/json"});
        //                                 res.write(
        //                                     JSON.stringify({
        //                                         success: true,
        //                                         message: "Successfully updated the data file"
        //                                 }));
        //                                 return res.end();
                                        
        //                             }
        //                             else {
        //                                 console.log("Error occured while updating the JSON file.");
        //                                 timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        //                                 console.log(timestamp);
        //                             }
        //                         }
        //                     );
        //                 }
        //                 else {
        //                     console.log("Error occured while reading the JSON file.");
        //                     timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        //                     console.log(timestamp);
        //                 }
        //             }
        //         );
                
                
        //     } catch (error) {
        //         res.writeHead(500, {"Content-Type": "application/json"});
        //         res.write(
        //             JSON.stringify({message: "Internal server error!"})
        //         );
        //         return res.end();
        //     }

        // }

        else {
            res.writeHead(404);
            res.write(
                JSON.stringify(
                    failure("Route not found.")
                    )
            )
            return res.end();
        }
    });

    
});

// 
server.listen(port, () => {
    try {
        console.log("Server is running on",port);
    } catch (error) {
        console.log("Something went wrong in server on",port);
    }
    
});