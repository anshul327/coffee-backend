// NODEMON is used to reload so that we dont have to restart again n again after saving changes in backend file

// require('dotenv').config({path : './env'}) OR USE
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path : './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server id running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection Failed!!!", err);
})