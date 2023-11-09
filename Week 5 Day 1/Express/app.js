const express = require('express');
const app = express();
const https = require('https');
const Product = require("./model/product");
const {success, failure} = require("./util/common");


const port = 8000;

//middle-wares
app.use(express.json()); // it allows us to access the json type data from the body of a request
app.use(express.urlencoded({ extended: true })); // it allows us to access the urlencoded type data from the body of a request, and by providing extended true we can get the defined data(else we will get undefined)


// app.get('/', (req, res) => {
//     // console.log(req);
//     console.log("Get request incoming");
//     return res.status(200).send( {message: "Get request successful"} );
// });
// app.get("/products", (req, res) => {
//     // console.log(req.query.id);
//     // console.log(req.query.name);
//     const {id, name} = req.query; // to avoid writing everytime req.query.something we do this restructuring
//     console.log(id);
//     console.log(name);
//     // console.log(req);
//     // console.log(req.method);
//     res.status(200).send({message: "Get request with query params"});
// });

// app.get("/products/details/:id/:name", (req, res) => {
//     const {id, name} = req.params;
//     console.log(id);
//     console.log(name);
//     // console.log(req);
//     console.log("req.method");
//     res.status(200).send({message: "Get request with path params"});
// });

// app.post("/", (req, res) => {
//     console.log(req.body);
//     res.status(200).send({message: "Post request successful"});
// });

// app.post("/products", (req, res) => {
//     // if these part of post request executes succesfully then the next part of (req, res) will be executed.
//     // Example: We can do the authentication using tokens(JWT token etc.)
// }, (req, res) => {
//     // Example: Then we can do the rest of code after authentication
// });
// ---------------------------------------------------------------------------------------- // Task starts..

// GET all products
app.get('/products/all', async (req, res) => {
    try {
        const result = await Product.getAll();
        console.log(result);
        if(result.success) {
            return res.status(200).send( success("Successfully got all products", result.data));
        } else{
            return res.status(404).send( failure("Products not found"));
        }
    } catch (error) {

        return res.status(404).send( failure("Internal server error"));
    }
});

app.use((err, req, res, next) => {
    if(err instanceof SyntaxError && err.status === 400 && "body" in err){
        return res.status(400).send({message:"Invalid JSON format"});
    }
});

// ADD one product
app.post('/products/add', 
    async (req, res, next) => {
        let product = req.body;
        console.log(product);
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
            console.log(errors);
            return res.status(304).send( failure("Properties error",errors));
        }
        next();
    }, async (req, res) => {
        try {
            let newProduct = req.body;
            console.log(newProduct);
            const result = await Product.addProduct(newProduct);
            
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
});

// GET one product by id using path params
app.get('/products/product/:id', async (req, res) => {
    try {
        // // const queryParams = getQueryParams();
        // // const result = await Product.getByQuery(queryParams);

        const { id } = req.params;
        const result = await Product.getById(JSON.parse(id));
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
});

// UPDATE one product by id using query params
app.put('/products/update', async (req, res) => {
    try {  
        const {id} = req.query;
        let updateOnProduct = req.body;
        const result = await Product.updateById(JSON.parse(id), updateOnProduct);
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
});

//DELETE one probuct by id using path params
app.delete('/products/delete', async (req, res) => {
    try {               
        const id = req.query.id;
        const result = await Product.deleteById(JSON.parse(id));
        console.log(result);
        if(result.success) {
            return res.status(202).send( success( 
                "The product has been deleted", 
                result.data, 
                // new Date().getTime()
            ));
        } else if(result.error){
            return res.status(404).send( failure( "No product exists with that id", result.error));
        } else{
            return res.status(304).send( failure( "Product could not be deleted"));
        }
    } catch (error) {
        return res.status(500).send( failure( "Internal server error"));
    }
});



app.use((req, res) => {
    res.status(400).send({message: "No route found"});
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
