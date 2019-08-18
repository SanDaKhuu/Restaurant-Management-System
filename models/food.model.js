const mongoose = require('mongoose')

var foodSchema = new mongoose.Schema({
    foodID: {
        type: String,
        required: 'This field is requried'
    }, 

    // img: {
    //     type: String
    // },

    title: {
        type: String,
        required: 'This field is requried'
    },

    category: {
        type: String
        // required: 'This field is requried'
    },

    type: {
        type: String,
        required: 'This field is requried'
    },

    price: {
        type: Number,
        required: 'This field is requried'
    }

})

mongoose.model('Food',foodSchema)