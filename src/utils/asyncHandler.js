// PROMISE FORM (advanced syntax)
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export { asyncHandler }

// const asyncHandler = () => {}
// const asyncHandler = (func) => {()=> {}}
// const asyncHandler = (func) => async () => {}

// TRY CATCH FORM

// const asyncHandler = (fn) => async (req, es, next) => {
//     try{
//         await fn(req,res,next)
//     } catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }