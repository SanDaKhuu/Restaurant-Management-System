require('../models/db')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const viewsPath = path.join(__dirname, '../templates')
const publicDirectoryPath = path.join(__dirname, '../public')

const adminController = require('../controllers/adminController')
const staffController = require('../controllers/staffController')
const foodController = require('../controllers/foodController')
const drinkController = require('../controllers/drinkController')
const tableController = require('../controllers/tableController')
const fdController = require('../controllers/fdController')
const vouController = require('../controllers/vouController')

// var MongoClient = require('mongodb').MongoClient
// const url='mongodb+srv://sdkht:%30%33%34%38%37%38@admin-eqtcw.mongodb.net/test?retryWrites=true&w=majority'

// MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
//     const collection = client.db("test").collection("staff")
//     console.log("Connected")
//     var insert={staffID:'sta1',name:'sankhuu',nrc:'12/PaZaTa(N)123456',phone:'09951234567',address: "Pzd", position:"Mangaer"}

//     collection.insertOne(insert,function(err,res){
//         console.log("Data Inserted")
//     })

//     client.close()
// })

app.use(express.static(publicDirectoryPath))

app.set('views', path.join(__dirname, '../views/'))

app.set('view engine', 'hbs')

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.render('restaurant/index')
})

app.get('/index', (req, res) => {
    res.render('restaurant/index')
})

app.get('/addDrink', (req, res) => {
    res.render('restaurant/addDrink')
})

app.get('/register', (req, res) => {
    res.render('restaurant/register')
})

app.get('/cashier', (req, res) => {
    res.render('restaurant/cashier')
})

app.get('/kitchen', (req, res) => {
    res.render('restaurant/kitchen')
})

app.get('/createTable', (req, res) => {
    res.render('restaurant/createTable')
})

app.get('/dailysale', (req, res) => {
    res.render('restaurant/dailysale')
})

app.get('/food-edit', (req, res) => {
    res.render('restaurant/food-edit')
})

app.get('/food-payment', (req, res) => {
    res.render('restaurant/food-payment')
})

app.get('/login', (req, res) => {
    res.render('restaurant/login')
})

app.get('/monthlysale', (req, res) => {
    res.render('restaurant/monthlysale')
})

app.get('/order2', (req, res) => {
    res.render('restaurant/order2')
})

app.get('/waiter', (req, res) => {
    res.render('restaurant/waiter')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use('/adminDB', adminController)
app.use('/staffDB', staffController)
app.use('/foodDB', foodController)
app.use('/drinkDB', drinkController)
app.use('/tableDB', tableController)
app.use('/fdDB', fdController)
app.use('/vouDB', vouController)