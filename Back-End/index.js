//modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
//routes
const usersRouter = require("./router/usersRouter");
const productsRouter = require("./router/productsRouter");
const categoriesRouter = require("./router/categoriesRouter");
const blogsRouter = require("./router/blogsRouter");
//utils
const httpRespone = require("./utils/httpRespone");

//connect to DataBase
const url = process.env.MONGO_URL;
mongoose
    .connect(url)
    .then(() => console.log("connected to mongoBD server"))
    .catch((err) => console.log("unable to connect to mongoDB server", err));

const app = express();

app.use(cors());
app.use(express.json());

//APIs
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

//global middle ware for not found routes
app.all("*", (req, res, next) => {
    return res.status(404).json(httpRespone.badResponse(404, "page not found"));
});

//global error handler
app.use((error, req, res, next) => {
    res.status(500).json(
        httpRespone.badResponse(`internal server error! ${error}!`)
    );
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost on port ${PORT}`);
});
