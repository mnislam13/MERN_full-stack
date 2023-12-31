const port = 8000;
const express = require("express");
const app = express();
const ProductRouter = require("./routes/Product");
// const dotenv = require("dotenv");

// dotenv.config();

app.use(express.json()); // Parses data as JSON
// app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

app.use("/products", ProductRouter);

app.use((req, res) => {
  res.status(400).send({message: "No route found"});
});

// checks invalid json file
app.use((err, req, res, next)=>{
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
      return res.status(400).send({message: 'Invalid json format'})
  }
  next()
})

app.listen(8000, () => {
  // console.log(process.env.TEST_DB);
  console.log("Server is running on port 8000");
});