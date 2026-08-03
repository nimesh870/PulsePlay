const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGO_SPOTIFY_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log(`Database connected.`)
    } catch (error) {
        console.log("Cannot connect database. Error:",error.message)
        process.exit(1)
    }
}

module.exports = connectDB;