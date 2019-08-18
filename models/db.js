// mongoose.connect('mongodb://localhost:27017/RestaurantDB',{useNewUrlParser: true}, (err) => {

var mongodb = require('mongodb')
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://sdkht:%30%33%34%38%37%38@admin-eqtcw.mongodb.net/Restaurant?retryWrites=true&w=majority',{useNewUrlParser: true}, (err) => {
    if(!err)
    {console.log('MongoDB Connection Succeeded')}

    else {console.log('Error in DB connection : '+ err)}
})


require('./admin.model')
require('./staff.model')
require('./food.model')
require('./drink.model')
require('./table.model')
require('./voucher.model')