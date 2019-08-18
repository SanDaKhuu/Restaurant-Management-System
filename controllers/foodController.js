const express = require('express')
var router = express.Router()
const mongoose=require('mongoose')

// const fs=require('fs')
// const path=require('path')

const Food = mongoose.model('Food')

router.get('/',(req,res)=>{
    res.render('restaurant/food-edit',{
        viewTitle: 'Create New Menu'
    })
})

router.post('/',(req,res)=> {
    if(req.body._id=='')
        insertRecord(req,res)

    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var food = new Food()

    food.foodID = req.body.foodID
    // food.img.data = fs.readFileSync(req.body.img.path)
    // food.img.contentType = 'image/jpg'
    food.title = req.body.title
    food.category = req.body.category
    food.type = req.body.type
    food.price = req.body.price

    food.save((err,doc)=>{
        if(!err) 
        { 
            res.redirect('foodDB/food-list')
            //res.json("Registration Success")
        }
            

        else{
            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render('restaurant/food-edit',{
                viewTitle : "Create New Menu",
                foodDB: req.body
            })
            }

            else
            console.log('Error during record insertion : '+err)
        }
    })
}

function updateRecord(req,res){
    Food.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err,doc)=>{
        if(!err) { res.redirect('foodDB/food-list')}


        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)

                res.render("restaurant/food-list",{
                    viewTitle : "Update Menu",
                    foodDB: req.body
                })
            }

            else console.log('Error during record update : '+err)
        }
    })
}

router.get('/food-list',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Food.find((err, docs)=>{
        if(!err){
            res.render('restaurant/food-list',{
                list: docs
            })
        }

        else {
            console.log('Error in retrieving restaurant list : '+ err)
        }
    })
})

router.get('/api',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Food.find((err, docs)=>{
        if(!err){
            res.send(docs)
        }

        else {
            console.log('Error in retrieving restaurant list : '+ err)
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'foodID':
                body['foodIDError'] = err.errors[field].message
                break;
        
            // case 'img':
            //     body['imgError'] = err.errors[field].message
            //     break;

            case 'title':
                body['titleError'] = err.errors[field].message
                break;

            // case 'category':
            //     body['categoryError'] = err.errors[field].message
            //     break;

            case 'type':
                body['typeError'] = err.errors[field].message
                break;

            case 'price':
                body['priceError'] = err.errors[field].message
                break;

            default:
                break;

        }
    }
}

router.get('/:id',(req,res)=>{
    Food.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("./restaurant/food-edit",{
                viewTitle : "Update Menu",
                foodDB: doc
            })
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    Food.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('../food-list')
        }

        else{
            console.log('Error in restaurant : '+err)
        }
            
    })
})

module.exports = router