const express = require('express')
var router = express.Router()
const mongoose=require('mongoose')
const Table = mongoose.model('Table')

router.get('/',(req,res)=>{
    res.render('restaurant/createTable',{
        viewTitle: "Create New Table"
    })
})

router.post('/',(req,res)=> {
    if(req.body._id=='')
        insertRecord(req,res)

    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var table = new Table()

    table.name = req.body.name
    // table.number = req.body.number
    table.roll = req.body.roll
    table.price = req.body.price
    table.perHour = req.body.perHour

    table.save((err,doc)=>{
        if(!err) 
        { 
            res.redirect('tableDB/tableAll')
            //res.json("Registration Success")
        }

        else{
            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render('restaurant/createTable',{
                viewTitle : "Create New Table",
                tableDB: req.body
            })
            }

            else
            console.log('Error during record insertion : '+err)
        }
    })
}

function updateRecord(req,res){
    Table.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err,doc)=>{
        if(!err) { res.redirect('tableDB/tableAll')}


        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)

                res.render("restaurant/createTable",{
                    viewTitle : "Update Table",
                    tableDB: req.body
                })
            }

            else console.log('Error during record update : '+err)
        }
    })
}

router.get('/tableAll',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Table.find((err, docs)=>{
        if(!err){
            res.render('restaurant/tableAll',{
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
    Table.find((err, docs)=>{
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
        
            case 'name':
                body['nameError'] = err.errors[field].message
                break;

            // case 'number':
            //     body['numberError'] = err.errors[field].message
            //     break;

            case 'roll':
                body['rollError'] = err.errors[field].message
                break;

            case 'price':
                body['priceError'] = err.errors[field].message
                break;

            case 'perHour':
                body['perHourError'] = err.errors[field].message
                break;

            default:
                break;

        }
    }
}

router.get('/:id',(req,res)=>{
    Table.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("./restaurant/createTable",{
                viewTitle : "Update Table",
                tableDB: doc
            })
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    Table.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('../tableAll')
        }

        else{
            console.log('Error in restaurant : '+err)
        }
            
    })
})

module.exports = router