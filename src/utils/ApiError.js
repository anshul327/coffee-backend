// making error as a utility as we will use this every here n there
// we overwrite currently existing Node.js Error class

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack= ""
    ){
        super(message)
        this.statusCode= statusCode
        this.data= null
        this.message= message
        this.success= false
        this.errors= errors

        if(stack) {
            this.stack= stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}