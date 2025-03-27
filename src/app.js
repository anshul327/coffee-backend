import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
// It helps in handling requests from a frontend hosted on a different domain.
// The `origin` option specifies which domains are allowed, and `credentials: true` enables cookies to be sent.
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

// Parse incoming JSON requests with a size limit of 16kb.
// This middleware helps process JSON data sent in requests.
app.use(express.json({limit: "16kb"}))

// Parse URL-encoded data (form data) from incoming requests.
// `extended: true` allows for rich objects and arrays to be encoded in the URL-encoded format.
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Serve static files (like images, CSS, JS) from the "public" directory.
// This allows the server to serve files directly without needing additional routes.
app.use(express.static("public"))

// Parse cookies from incoming requests and make them available in `req.cookies`.
// Useful for handling user authentication sessions and preferences.
app.use(cookieParser())



// routes import

import userRouter from './routes/user.routes.js'

// routes declaration
// this middleware (.get) gives control to userRoute as soon as /users is visited
app.use("/api/v1/users", userRouter)

export { app }
