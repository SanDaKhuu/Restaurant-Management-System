const express = require('express')
var router = express.Router()
const mongoose=require('mongoose')

// const fs=require('fs')
// const path=require('path')

const Drink = mongoose.model('Drink')

router.get('/',(req,res)=>{
    res.render('restaurant/addDrink',{
        viewTitle: 'Create New Drink'
    })
})

router.post('/',(req,res)=> {
    if(req.body._id=='')
        insertRecord(req,res)

    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var drink = new Drink()

    drink.drinkID = req.body.drinkID
    // food.img.data = fs.readFileSync(req.body.img.path)
    // food.img.contentType = 'image/jpg'
    drink.title = req.body.title
    drink.category = req.body.category
    drink.price = req.body.price

    drink.save((err,doc)=>{
        if(!err) 
        { 
            res.redirect('drinkDB/drinklist')
            //res.json("Registration Success")
        }
            

        else{
            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render('restaurant/addDrink',{
                viewTitle : "Create New Drink",
                drinkDB: req.body
            })
            }

            else
            console.log('Error during record insertion : '+err)
        }
    })
}

function updateRecord(req,res){
    Drink.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err,doc)=>{
        if(!err) { res.redirect('drinkDB/drinklist')}


        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)

                res.render("restaurant/drinklist",{
                    viewTitle : "Update Drink",
                    drinkDB: req.body
                })
            }

            else console.log('Error during record update : '+err)
        }
    })
}

router.get('/drinklist',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Drink.find((err, docs)=>{
        if(!err){
            res.render('restaurant/drinklist',{
                list: docs
            })
        }

        else {
            console.log('Error in retrieving drink list : '+ err)
        }
    })
})

router.get('/api',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Drink.find((err, docs)=>{
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
            case 'drinkID':
                body['drinkIDError'] = err.errors[field].message
                break;
        
            // case 'img':
            //     body['imgError'] = err.errors[field].message
            //     break;

            case 'title':
                body['titleError'] = err.errors[field].message
                break;

            case 'category':
                body['categoryError'] = err.errors[field].message
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
    Drink.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("./restaurant/addDrink",{
                viewTitle : "Update Drink",
                drinkDB: doc
            })
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    Drink.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('../drinklist')
        }

        else{
            console.log('Error in restaurant : '+err)
        }
            
    })
})

module.exports = router