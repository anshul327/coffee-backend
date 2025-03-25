// NODEMON is used to reload so that we dont have to restart again n again after saving changes in backend file

// require('dotenv').config({path : './env'}) OR USE
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path : './env'
})

connectDB()