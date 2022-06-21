import express from "express";
const app = express();
import mongoose from "mongoose";
import blogRouter from "./routes/blog-router.js";
import router from "./routes/user-routes.js";
import cors from "cors";
//const path = require("path");
import path from "path";
//require("dotenv").config();

const PORT = process.env.PORT || 5000;
//const {MONGOURI} = require('./config/keys.js');
const MONGOURI = process.env.MOGOURI || 'mongodb+srv://admin:diksha90096@cluster0.sewn6.mongodb.net/BlogApp?retryWrites=true&w=majority'

app.use(cors());
app.use(express.json());
app.use("/api/user", router); //here giving url path e.g. http://localhost:5000/api/user/ ...all of routers will work
app.use("/api/blog", blogRouter);

mongoose.connect(
    MONGOURI
).then(() => app.listen(PORT)
).then(() =>
    console.log("Connected to Port!")
).catch((err) => console.log(err));


// step 3: Heroku 
//const __dirname = path.resolve();
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

//diksha90096  admin  "alert": "^5.0.10",