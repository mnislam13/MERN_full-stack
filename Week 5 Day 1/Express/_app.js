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

        res.setHeader("Content-Type", "application/json");
        const requestURL = req.url.split("?")[0];
        // Route@ /products/all 
        // Method GET
        // console.log(req.url);
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
                           success("Successfully added the product", result.data) 
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
        
        // Route@ /products/all?id
        // Method GET
        // console.log(req.url);
        else if(requestURL === "/products/product" && req.method === "GET"){
            try {
                // // const queryParams = getQueryParams();
                // // const result = await Product.getByQuery(queryParams);

                const queryParams = getQueryParams();
                const id = queryParams.id;

                const result = await Product.getById(JSON.parse(id));
                console.log(result);
                if(result.success) {
                    res.writeHead(200);
                    res.write(
                        JSON.stringify(
                           success("The product has been found", result.data) 
                        )
                    )
                    return res.end();
                } else if(result.error){
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("No product exists with that id", result.error)
                         )
                    )
                    return res.end();
                } else{
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("The product could not be found")
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

        // Route@ /products/update?id
        // Method PUT
        // console.log(req.url);
        else if(requestURL === "/products/update" && ( req.method === "PUT" || req.method === "PATCH" )){
            try {  
                const queryParams = getQueryParams();
                const id = queryParams.id;
                let updateOnProduct = JSON.parse(body);
                const result = await Product.updateById(JSON.parse(id), updateOnProduct);
                console.log(result);
                if(result.success) {
                    res.writeHead(200);
                    res.write(
                        JSON.stringify(
                           success("The product has been updated", result.data) 
                        )
                    )
                    return res.end();
                } else if(result.error){
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("No product exists with that id", result.error)
                         )
                    )
                    return res.end();
                } else{
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("The product could not be updated")
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


        // Route@ /products/delete?id
        // Method DELETE
        // console.log(req.url);
        else if(requestURL === "/products/delete" && req.method === "DELETE"){
            try {               
                const queryParams = getQueryParams();
                const id = queryParams.id;
                const result = await Product.deleteById(JSON.parse(id));
                console.log(result);
                if(result.success) {
                    res.writeHead(200);
                    res.write(
                        JSON.stringify(
                           success("The product has been deleted", result.data) 
                        )
                    )
                    return res.end();
                } else if(result.error){
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("No product exists with that id", result.error)
                         )
                    )
                    return res.end();
                } else{
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("The product could not be deleted")
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

        // Route@ /products/totalstock
        // Method GET
        // console.log(req.url);
        else if(requestURL === "/products/totalstock" && req.method === "GET"){
            try {               
                // let condition = JSON.parse(body);
                const result = await Product.calculateStock();
                console.log(result);
                if(result.success) {
                    res.writeHead(200);
                    res.write(
                        JSON.stringify(
                           success("The total stock remaining", result.data) 
                        )
                    )
                    return res.end();
                } else if(result.error){
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("The total stock has not been calculated", result.error)
                         )
                    )
                    return res.end();
                } else{
                    console.log();
                    res.writeHead(404);
                    res.write(
                        JSON.stringify(
                            failure("Error occured")
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

        // Route@ /products/update?id
        // Method PUT
        // console.log(req.url);
        // else if(requestURL === "/products/discount" && req.method === "PATCH"){
        //     try {  
        //         const queryParams = getQueryParams();
        //         const category = queryParams.category;
        //         let discount = JSON.parse(body);
        //         const result = await Product.giveDiscount(JSON.parse(category), discount);
        //         console.log(result);
        //         if(result.success) {
        //             res.writeHead(200);
        //             res.write(
        //                 JSON.stringify(
        //                    success("The product has been updated", result.data) 
        //                 )
        //             )
        //             return res.end();
        //         } else if(result.error){
        //             console.log();
        //             res.writeHead(404);
        //             res.write(
        //                 JSON.stringify(
        //                     failure("No product exists with that id", result.error)
        //                  )
        //             )
        //             return res.end();
        //         } else{
        //             console.log();
        //             res.writeHead(404);
        //             res.write(
        //                 JSON.stringify(
        //                     failure("The product could not be updated")
        //                  )
        //             )
        //             return res.end();
        //         }
        //     } catch (error) {
        //         res.writeHead(500);
        //         res.write(
        //             failure("Internal server error")
        //         );
        //         return res.end();
        //     }
        // }
        
        // NO Route@ MATCHED
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