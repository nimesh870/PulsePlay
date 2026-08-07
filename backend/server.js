const app = require('./src/app')
require('dotenv').config()
const connectDB = require('./src/config/db')


const PORT = process.env.PORT;

app.listen(PORT , (error) => {
    if (error)  throw error;
    console.log(`Server is listening....`)
})

connectDB();