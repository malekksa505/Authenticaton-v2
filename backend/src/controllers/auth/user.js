import asyncHandler from 'express-async-handler'

export const userRegister = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        res.status(400).json({
            message:"all fields are required"
        })
    }
})