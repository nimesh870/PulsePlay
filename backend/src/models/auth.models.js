const Mongoose = require('mongoose')

const authSchema = new Mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : [true , "username must be unique."],
        minlength : [3 , "username must contain atleast 3 characters."]
    },

    email : {
        type : String,
        unique : [true , "email must be unique."],
        required : true,
    },

    password : {
        type : String,
        required : true,
        minlength : [6 , "password must contain atleast 6 characters."]
    },

    role : {
        type : String,
        enum : ['user' ,'artist'],
        default : 'user'
    }
})

authSchema.methods.toJSON = function () {
    const userAuth = this.toObject();
    delete userAuth.password;
    return userAuth;
}

const authModel =  Mongoose.model("auth" , authSchema);
module.exports = authModel;