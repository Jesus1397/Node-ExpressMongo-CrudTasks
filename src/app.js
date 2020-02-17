//EXPRESS-EJS-MORGAN-NODEMON-PATH
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//connecting to db
mongoose
  .connect("mongodb://localhost/crud-mongo", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(db => {
    console.log("---DB connected");
  })
  .catch(e => {
    console.log("---Error:" + e);
  });

//import routes
const routes = require("./routes/index");

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", routes);

//starting server
app.listen(app.set("port"), () => {
  console.log(`---Server on http://localhost:${app.get("port")}`);
});
