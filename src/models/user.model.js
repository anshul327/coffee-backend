import mongoose, {Schema} from "mongoose";

import jwt from "jsonwebtoken" // JWTs are primarily used for authentication and secure data exchange in web applications and APIs

import bcrypt from "bcrypt" // securely hashing passwords

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // for efficient searching
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // for efficient searching
        },

        avatar: {
            type: String, // cloudnary url
            required: true,
        },

        coverImage: {
            type: String,
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],

        password: {
            type: String,
            required: [true, 'Password is required'],
        },

        refreshToken: {
            type: String,
        }

    }, 
    {
        timestamps: true
    }
);

// plugin, pre all are hooks or say middle wares
// "save" with pre hook means, before saving DataBase
// donot use () => {} as callBack here as it donot has referece i.e. this
// async used as encryption takes time
// every middleware use next, next means pass to next when done
// middlewares : Used to execute code before or after a document is saved, updated, or deleted. 

userSchema.pre("save", async function(next) {
    // first check, if password is modified then only encrypt again
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//  Methods defined within userSchema.methods become functions that can be called on individual documents (instances) of the model created from that schema.
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// access tokens are short lived
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id, // collected from mongoDB
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// refresh tokens are long lived
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id, // collected from mongoDB
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)