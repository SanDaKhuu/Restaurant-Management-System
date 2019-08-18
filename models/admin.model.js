const mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    adminID: {
        type: String,
        required: 'This field is requried'
    }, 

    staffID: {
        type: String,
        required: 'This field is requried'
    },

    email: {
        type: String,
        required: 'This field is requried'
    },

    psw1: {
        type: String,
        required: 'This field is requried'
    },

    psw2: {
        type: String,
        required: 'This field is requried'
    }
})

adminSchema.path('email').validate((val)=> {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val)
}, 'Invalid email')

mongoose.model('Admin',adminSchema)