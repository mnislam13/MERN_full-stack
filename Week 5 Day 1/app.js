const express = require('express');
const app = express();

//middle-wares
app.use(express.json); // it allows us to access the json type data from the body of a request
app.use(express.urlencoded({ extended: true })); // it allows us to access the urlencoded type data from the body of a request, and by providing extended true we can get the defined data(else we will get undefined)

const port = 8000;

app.get("/", (req, res) => {
    // console.log(req);
    console.log("req.method");
    res.statusCode(200).send({message: "Hello world"});
});

app.get("/products", (req, res) => {
    // console.log(req.query.id);
    // console.log(req.query.name);
    const {id, name} = req.query; // to avoid writing everytime req.query.something we do this restructuring
    console.log(id);
    console.log(name);
    // console.log(req);
    console.log("req.method");
    res.statusCode(200).send({message: "Hello world"});
});

app.get("/products/details/:id/:name", (req, res) => {
    const {id, name} = req.params;
    console.log(id);
    console.log(name);
    // console.log(req);
    console.log("req.method");
    res.statusCode(200).send({message: "Hello world"});
});

app.post("/products", (req, res) => {
    console.log(req.body);
    res.statusCode(200).send({message: "Post request successful"});
});

app.post("/", (req, res) => {
    // if these part of post request executes succesfully then the next part of (req, res) will be executed.
    // Example: We can do the authentication using tokens(JWT token etc.)
}, (req, res) => {
    // Example: Then we can do the rest of code after authentication
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
