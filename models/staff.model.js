const mongoose = require('mongoose')

var staffSchema = new mongoose.Schema({
    staffID: {
        type: String,
        required: 'This field is requried'
    }, 

    name: {
        type: String,
        required: 'This field is requried'
    },

    nrc: {
        type: String,
        required: 'This field is requried'
    },

    phone: {
        type: String,
        required: 'This field is requried'
    },

    address: {
        type: String,
        required: 'This field is requried'
    },

    position: {
        type: String,
        required: 'This field is requried'
    }
})

mongoose.model('Staff',staffSchema)