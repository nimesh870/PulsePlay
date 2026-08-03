const Mongoose = require('mongoose')

const musicSchema = new Mongoose.Schema({
    uri : {
        type : String,
        required : true
    },

    title : {
        type : String,
        required : true
    },

    artist : {
        type : Mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'auth'
    }
})

const musicModel = Mongoose.model('music' , musicSchema)
module.exports = musicModel;