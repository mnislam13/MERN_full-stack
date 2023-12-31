const port = 8000;
const express = require("express");
const app = express();
const cors = require("cors");
const ProductRouter = require("./routes/Product");
const UserRouter = require("./routes/User");
const BookRouter = require("./routes/Book");
const OrderRouter = require("./routes/Order");
const AuthRouter = require("./routes/Auth");
const CartRouter = require("./routes/Cart");

const dotenv = require("dotenv");
dotenv.config();
const databaseConnection = require("./config/database");


app.use(cors({origin: "*"}));

app.use(express.json()); // Parses data as JSON
// app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: true })); // Parses data as urlencoded

app.use("/products", ProductRouter);
app.use("/users", UserRouter);
app.use("/books", BookRouter);
app.use("/orders", OrderRouter);
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);

// app.use("/bookstore", BookstoreRouter);

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


databaseConnection(() => {
  app.listen(8000, () => {
    // console.log(process.env.TEST_DB);
    console.log("Server is running on port 8000");
  });
});


