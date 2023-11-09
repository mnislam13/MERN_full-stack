const port = 8000;
const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');
const { type } = require('os');
let timestamp;


// this create server callback function will be executed after the server listens to any request
const server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (buffer) => {
        body += buffer;
    });

    req.on("end", () => {
        // console.log("Data received", JSON.parse(body));

        // Get all the data stored in the server this route
        // console.log(req.url);
        if(req.url === "/products/all" && req.method === "GET"){
            try {
                // const data = JSON.parse(
                //     fs.readFileSync("./data/products.json", "utf-8")
                // );
                // console.log(data);
                // res.writeHead(200, {"Content-Type": "text/json"});
                // res.write(
                //     JSON.stringify({message: "Received response successfully!"})
                // );
                // return res.end(); //res.end() should NEVER be called twice, that's why we have to return the function


                
                // this fs.readFile is asynchronous and the type is utf-8 by default
                // it has 1 parameters for path of the file and then the callback function and there are 3 other which I need to know
                fs.readFile(
                
                    path.join( __dirname, "data", "products.json"),
                    (err, data) => {
                        if(!err) {
                            const jsonData = JSON.parse(data);
                            res.writeHead(200, {"Content-Type": "application/json"});
                            res.write(JSON.stringify(jsonData));
                            return res.end();
                        }
                        else{
                            console.log("File couldn't be read.")
                        }
                    }
                );
            } catch (error) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(
                    JSON.stringify({message: "Internal server error!"})
                );
                return res.end();
            }
        }

        // Receiving an object from client to update in the server through this route
        else if(req.url === "/products/addOneProduct" && req.method === "POST") {
            try {
                // validation
                if(body.hasAttribute('title')){
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.write(
                        JSON.stringify({message: "Product title is not mentioned!"})
                    );
                    return res.end();
                }
                const newProduct = JSON.parse(body);
                
                
                const pathData = path.join( __dirname, "data", "products.json");
                // console.log(newProduct);
                fs.readFile(pathData,
                    (err, data) => {
                        if(!err) {
                            console.log("JSON file was read successfully.");
                            timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
                            console.log(timestamp);
                            
                            let jsonData = JSON.parse(data);
                            jsonData.push(newProduct);
                            fs.writeFile(
                                pathData, JSON.stringify(jsonData),
                                (err, data) => {
                                    if(!err) {
                                        fs.writeFileSync("./log.txt", "JSON file updated with the new product.");
                                        timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
                                        fs.writeFileSync("./log.txt", timestamp);
                                        res.writeHead(200, {"Content-Type": "application/json"});
                                        res.write(
                                            JSON.stringify({
                                                success: true,
                                                message: "Successfully updated the data file"
                                        }));
                                        return res.end();
                                        
                                    }
                                    else {
                                        console.log("Error occured while updating the JSON file.");
                                        timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
                                        console.log(timestamp);
                                    }
                                }
                            );
                        }
                        else {
                            console.log("Error occured while reading the JSON file.");
                            timestamp = `At- ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
                            console.log(timestamp);
                        }
                    }
                );
                
                
            } catch (error) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(
                    JSON.stringify({message: "Internal server error!"})
                );
                return res.end();
            }

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