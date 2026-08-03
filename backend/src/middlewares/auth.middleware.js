const jwt = require('jsonwebtoken')
require('dotenv').config()
const authModel = require('../models/auth.models')

const jwtSecretKey = process.env.JWT_SECRET

const protect = async (req , res , next) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                error : "No token provided. Please login."
            })
        }

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token , jwtSecretKey)

        const user = await authModel.findById(decode.id)

        if (!user) {
            return res.status(404).json({
                error : "user not found."
            })
        }

        if (user.role !== 'artist') {
            return res.status(403).json({
                error : "This page can only be accessed by artists."
            })
        }

        req.user = user;
        next();

    } catch (error) {
        // jwt.verify() throws specific errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please log in again.' })
        }
        res.status(500).json({ error: 'Server error during authentication' })
    }
}

const authUser = async (req , res , next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({
                error : "No token provided. Please login."
            })
        }
        
        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token , jwtSecretKey)

        const user = await authModel.findById(decode.id)

        if (user.role !== 'user' && user.role !== 'artist') {
            return res.status(403).json({
                error : "You dont have access."
            })
        }

        req.user = user;

        next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please log in again.' })
        }
        res.status(500).json({ error: 'Server error during authentication' })
    }
}

module.exports = {protect , authUser};