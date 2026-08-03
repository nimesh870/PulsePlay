const express = require('express')
const {registerUser , loginUser} = require('../controllers/auth.controller')

const authRoutes = express.Router()

authRoutes.post('/register' , registerUser);
authRoutes.post('/login' , loginUser);

module.exports = authRoutes;