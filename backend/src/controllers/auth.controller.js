require('dotenv').config()
const jwt = require('jsonwebtoken')
const authModel = require('../models/auth.models')
const bcrypt = require('bcrypt')

const jwtSecretKey = process.env.JWT_SECRET

const registerUser = async (req , res) => {
    try {
        
        const {username , email , password , role = "user"} = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                error : "You must fill all the fields."
            })
        }

        const existingUser = await authModel.findOne({
            $or : [{email} , {username}]
        })

        if (existingUser) {
            return res.status(409).json({
                error : existingUser.email === email 
                ? "User with email already exist."
                : "User with username already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const createUser = await authModel.create({
            username,
            email,
            password : hashedPassword,
            role
        })

        const token = jwt.sign({
            id : createUser._id,
            user : createUser.role
        } , jwtSecretKey , {expiresIn : '7d'})

        res.cookie('token' , token , {
            httpOnly : true
        })

        res.status(201).json({
            message : "User registered successfully.",
            token,
            createUser
        })

    } catch (error) {
        res.status(500).json({
            error : "Cannot register user.",
            details : error.message
        })
    }
}

const loginUser = async (req , res) => {
    try {
        
        const {username , password , email} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error : "Required username or password."
            })
        }

        const user = await authModel.findOne({username})

        if (!user) {
            return res.status(401).json({
                error : "Invalid credentials."
            })
        }

        const comparePassword = await bcrypt.compare(password , user.password)

        if (!comparePassword) {
            return res.status(401).json({
                error : "Invalid credentials."
            })
        }

        const token = jwt.sign({
            id : user._id
        } , jwtSecretKey , {expiresIn : '7d'})

        res.cookie('token' , token , {
            httpOnly : true
        })

        res.status(200).json({
            message : "Login Successful.",
            token,
            user
        })

    } catch (error) {
        res.status(500).json({
            error : "Unable to login.",
            details : error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}