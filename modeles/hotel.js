const mongoose = require('mongoose')

const hotelschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('hotel3',hotelschema)