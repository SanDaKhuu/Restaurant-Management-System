const mongoose = require('mongoose')

var tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is requried'
    }, 

    // img: {
    //     data: Buffer,
    //     contentType: String
    // },

    // number: {
    //     type: Number,
    //     required: 'This field is requried'
    // },

    roll: {
        type: String,
        required: 'This field is requried'
    },

    price: {
        type: Number,
        required: 'This field is requried'
    },

    perHour: {
        type: Number,
        required: 'This field is requried'
    }

})

mongoose.model('Table',tableSchema)