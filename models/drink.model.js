const mongoose = require('mongoose')

var drinkSchema = new mongoose.Schema({
    drinkID: {
        type: String,
        required: 'This field is requried'
    }, 

    // img: {
    //     data: Buffer,
    //     contentType: String
    // },

    title: {
        type: String,
        required: 'This field is requried'
    },

    category: {
        type: String,
        required: 'This field is requried'
    },

    price: {
        type: Number,
        required: 'This field is requried'
    }

})

mongoose.model('Drink',drinkSchema)