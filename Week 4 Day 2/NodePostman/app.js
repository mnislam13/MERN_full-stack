const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/json"});
    res.write(JSON.stringify({message: "Hello World!"}));
    res.end();
});

server.listen(8000, () => {
    console.log("Server is running on 8000");
});