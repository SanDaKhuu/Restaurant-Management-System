const express = require('express')
var router = express.Router()
const mongoose=require('mongoose')
const Staff = mongoose.model('Staff')

router.get('/',(req,res)=>{
    res.render('restaurant/addstaff',{
        viewTitle: "Create New Staff"
    })
})

router.post('/',(req,res)=> {
    if(req.body._id=='')
        insertRecord(req,res)

    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var staff = new Staff()

    staff.staffID = req.body.staffID
    staff.name = req.body.name
    staff.nrc = req.body.nrc
    staff.phone = req.body.phone
    staff.address = req.body.address
    staff.position = req.body.position


    staff.save((err,doc)=>{
        if(!err) 
        { 
            res.redirect('staffDB/staff')
            //res.json("Registration Success")
        }
            

        else{
            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render('restaurant/addStaff',{
                viewTitle : "Create New Staff",
                staffDB: req.body
            })
            }

            else
            console.log('Error during record insertion : '+err)
        }
    })
}

function updateRecord(req,res){
    Staff.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},(err,doc)=>{
        if(!err) { res.redirect('staffDB/staff')}


        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body)

                res.render("restaurant/addStaff",{
                    viewTitle : "Update Staff",
                    staffDB: req.body
                })
            }

            else console.log('Error during record update : '+err)
        }
    })
}

router.get('/staff',(req,res)=>{
    // res.json('Data Inserted Successfully')
    Staff.find((err, docs)=>{
        if(!err){
            res.render('restaurant/staff',{
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
    Staff.find((err, docs)=>{
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
            case 'staffID':
                body['staffIDError'] = err.errors[field].message
                break;
        
            case 'name':
                body['nameError'] = err.errors[field].message
                break;

            case 'nrc':
                body['nrcError'] = err.errors[field].message
                break;

            case 'phone':
                body['phoneError'] = err.errors[field].message
                break;

            case 'address':
                body['addressError'] = err.errors[field].message
                break;

            case 'position':
                body['positionError'] = err.errors[field].message
                break;

            default:
                break;

        }
    }
}

router.get('/:id',(req,res)=>{
    Staff.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("./restaurant/addStaff",{
                viewTitle : "Update Staff",
                staffDB: doc
            })
        }
    })
})

router.get('/delete/:id', (req,res)=>{
    Staff.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('../staff')
        }

        else{
            console.log('Error in restaurant : '+err)
        }
            
    })
})

module.exports = router