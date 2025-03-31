import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

// sometimes when res or req is not in use we replace them by _
export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // cookies are passed with every request by browser
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user= user;
        next()
    
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})