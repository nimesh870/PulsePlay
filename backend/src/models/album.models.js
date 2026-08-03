const Monogoose = require('mongoose')

const albumSchema = new Monogoose.Schema({
    title : {
        type : String,
        required : true
    },

    musics : [{
        type : Monogoose.Schema.Types.ObjectId,
        ref : 'music'
    }],

    artist : {
        type : Monogoose.Schema.Types.ObjectId,
        required : true,
        ref : 'auth'
    }
})

const albumModel = Monogoose.model('album' , albumSchema)

module.exports = albumModel;