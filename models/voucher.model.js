const mongoose = require('mongoose')

var voucherSchema = new mongoose.Schema({
    date: {
        type: String
    }, 

    // img: {
    //     data: Buffer,
    //     contentType: String
    // },

    time: {
        type: String
    },

    category: {
        type: String
    },

    ftitle: {
        type: Array
    },

    dtitle: {
        type: Array
    },

    pricef: {
        type: Array
    },

    priced: {
        type: Array
    },

    qtyf: {
        type: Array
    },

    qtyd: {
        type: Array
    },

    total: {
        type: Number
    },

    tax: {
        type: Number
    },

    grandtotal: {
        type: Number
    }

})

mongoose.model('Voucher',voucherSchema)