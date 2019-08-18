const express = require('express')
var router = express.Router()
const mongoose=require('mongoose')
const Admin = mongoose.model('Admin')

router.get('/',(req,res)=>{
    res.render('restaurant/register',{
        viewTitle: "Registration"
    })
})

router.post('/',(req,res)=> {
    if(req.body._id=='')
        insertRecord(req,res)

    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var admin = new Admin()

    admin.adminID = req.body.adminID
    admin.staffID = req.body.staffID
    admin.email = req.body.email
    admin.psw1 = req.body.psw1
    admin.psw2 = req.body.psw2

    admin.save((err,doc)=>{
        if(!err) 
        { 
            res.redirect('adminDB/list')
            //res.json("Registration Success")
        }
            

        else{
            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render('restaurant/register',{
                // viewTitle : "Registration",
                adminDB: req.body
            })
            }

            else
            console.log('Error during record insertion : '+err)
        }
    })
}

function updateRecord(req,res){
    Admin.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err,doc)=>{
        if(!err) { res.redirect('adminDB/list')}


        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)

                res.render("restaurant/register",{
                    viewTitle : "Update Registration",
                    adminDB: req.body
                })
            }

            else console.log('Error during record update : '+err)
        }
    })
}

router.get('/list',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Admin.find((err, docs)=>{
        if(!err){
            res.render('restaurant/list',{
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
    Admin.find((err, docs)=>{
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
            case 'adminID':
                body['adminIDError'] = err.errors[field].message
                break;
        
            case 'staffID':
                body['staffIDError'] = err.errors[field].message
                break;

            case 'email':
                body['emailError'] = err.errors[field].message
                break;

            case 'psw1':
                body['psw1Error'] = err.errors[field].message
                break;

            case 'psw2':
                body['psw2Error'] = err.errors[field].message
                break;

            default:
                break;

        }
    }
}

router.get('/:id',(req,res)=>{
    Admin.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("./restaurant/register",{
                viewTitle : "Update Registration",
                adminDB: doc
            })
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    Admin.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('../list')
        }

        else{
            console.log('Error in restaurant : '+err)
        }
            
    })
})

module.exports = router