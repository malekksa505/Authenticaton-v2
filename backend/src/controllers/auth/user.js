import asyncHandler from 'express-async-handler'
import createUser from '../../models/auth/userModel.js';

export const userRegister = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        res.status(400).json({
            message:"all fields are required"
        })
    }
    if(password.length < 8) {
        return res.status(400)
        .json({message: "Password must be at least 8 chars"})
    }

    const userExist = await createUser.findOne({email})

    console.log(userExist);
})