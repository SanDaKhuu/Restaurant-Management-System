const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')

const Food = mongoose.model('Food')
const Voucher = mongoose.model('Voucher')
const Drink = mongoose.model('Drink')

router.post('/', (req, res) => {
    var fid = [];
    var qtyf = [];
    var ftitle = [];
    var dtitle = [];
    var did = [];
    var qtyd = [];
    var pricef = [];
    var priced = [];

    var j = 0;
    var k = 0;
    var total = 0;

    // only Drinks

    if (req.body.foodID == '' || req.body.foodID === undefined) {
        if (Array.isArray(req.body.drinkID))
            did = req.body.drinkID;

        else did[0] = req.body.drinkID;

        for (var i = 0; i < req.body.qtyDrink.length; i++) {
            if (req.body.qtyDrink[i] != '') {
                qtyd[k] = req.body.qtyDrink[i];
                priced[k] = req.body.priceDrink[i];
                k++;
            }
        }

        for (var i = 0; i < did.length; i++) {
            total += priced[i] * qtyd[i];
        }

        if (did.length === 1) {
            Drink.findOne({ drinkID: did[0] }, (err, d) => {
                dtitle[0] = d.title

                insertRecord(req, res)
            })
        }

        else {
            Drink.find({ drinkID: did }, (err, d) => {

                for (var i = 0; i < d.length; i++) {
                    dtitle[i] = d[i].title;
                }

                insertRecord(req, res)
            })

        }
    }


    // only Foods

    else if (req.body.drinkID == '' || req.body.drinkID === undefined) {
        if (Array.isArray(req.body.foodID))
            fid = req.body.foodID;

        else fid[0] = req.body.foodID;

        for (var i = 0; i < req.body.qtyFood.length; i++) {
            if (req.body.qtyFood[i] != '') {
                qtyf[j] = req.body.qtyFood[i];
                pricef[j] = req.body.priceFood[i];
                j++;
            }
        }

        for (var i = 0; i < fid.length; i++) {
            total += pricef[i] * qtyf[i];
        }

        if (fid.length === 1) {
            Food.findOne({ foodID: fid[0] }, (err, f) => {
                ftitle[0] = f.title

                insertRecord(req, res)
            })
        }

        else {
            Food.find({ foodID: fid }, (err, f) => {

                for (var i = 0; i < f.length; i++) {
                    ftitle[i] = f[i].title;
                }

                insertRecord(req, res)
            })

        }
    }


    //both Foods & Drinks

    else {   //food

        if (Array.isArray(req.body.foodID))
            fid = req.body.foodID;

        else fid[0] = req.body.foodID;

        for (var i = 0; i < req.body.qtyFood.length; i++) {
            if (req.body.qtyFood[i] != '') {
                qtyf[j] = req.body.qtyFood[i];
                pricef[j] = req.body.priceFood[i];
                j++;
            }
        }

        for (var i = 0; i < fid.length; i++) {
            total += pricef[i] * qtyf[i];
        }

        // drink

        if (Array.isArray(req.body.drinkID))
            did = req.body.drinkID;

        else did[0] = req.body.drinkID;

        for (var i = 0; i < req.body.qtyDrink.length; i++) {
            if (req.body.qtyDrink[i] != '') {
                qtyd[k] = req.body.qtyDrink[i];
                priced[k] = req.body.priceDrink[i];
                k++;
            }
        }

        for (var i = 0; i < did.length; i++) {
            total += priced[i] * qtyd[i];
        }

        if (fid.length === 1) {
            Food.findOne({ foodID: fid[0] }, (err, f) => {
                ftitle[0] = f.title

                if (did.length === 1) {
                    Drink.findOne({ drinkID: did[0] }, (err, d) => {
                        dtitle[0] = d.title

                        insertRecord(req, res)
                    })
                }

                else {
                    Drink.find({ drinkID: did }, (err, d) => {

                        for (var i = 0; i < d.length; i++) {
                            dtitle[i] = d[i].title;
                        }

                        insertRecord(req, res)
                    })

                }
            })
        }

        else {
            Food.find({ foodID: fid }, (err, f) => {

                for (var i = 0; i < f.length; i++) {
                    ftitle[i] = f[i].title;
                }

                if (did.length === 1) {
                    Drink.findOne({ drinkID: did[0] }, (err, d) => {
                        dtitle[0] = d.title

                        insertRecord(req, res)
                    })
                }

                else {
                    Drink.find({ drinkID: did }, (err, d) => {

                        for (var i = 0; i < d.length; i++) {
                            dtitle[i] = d[i].title;
                        }

                        insertRecord(req, res)
                    })

                }
            })

        }
    }

    function insertRecord(req, res) {
        var voucher = new Voucher()

        voucher.date = new Date().toDateString()
        voucher.time = new Date().toTimeString()
        voucher.category = 'Take Away'
        voucher.ftitle = ftitle
        voucher.pricef = pricef
        voucher.qtyf = qtyf
        voucher.dtitle = dtitle
        voucher.priced = priced
        voucher.qtyd = qtyd
        voucher.total = total
        voucher.tax = total * 0.05
        voucher.grandtotal = total + (total * 0.05)

        console.log("Data Inserted", total * 0.05, total + (total * 0.05))

        voucher.save((err, doc) => {
            if (!err) {
                res.redirect('../fdDB')
            }

        })
    }

})

router.post('/dinein', (req, res) => {
    var tname = req.body.name;
    var fid = [];
    var qtyf = [];
    var ftitle = [];
    var dtitle = [];
    var did = [];
    var qtyd = [];
    var pricef = [];
    var priced = [];

    var j = 0;
    var k = 0;
    var total = 0;

    // only Drinks

    if (req.body.foodID == '' || req.body.foodID === undefined) {
        if (Array.isArray(req.body.drinkID))
            did = req.body.drinkID;

        else did[0] = req.body.drinkID;

        for (var i = 0; i < req.body.qtyDrink.length; i++) {
            if (req.body.qtyDrink[i] != '') {
                qtyd[k] = req.body.qtyDrink[i];
                priced[k] = req.body.priceDrink[i];
                k++;
            }
        }

        for (var i = 0; i < did.length; i++) {
            total += priced[i] * qtyd[i];
        }

        if (did.length === 1) {
            Drink.findOne({ drinkID: did[0] }, (err, d) => {
                dtitle[0] = d.title

                insertRecord(req, res)
            })
        }

        else {
            Drink.find({ drinkID: did }, (err, d) => {

                for (var i = 0; i < d.length; i++) {
                    dtitle[i] = d[i].title;
                }

                insertRecord(req, res)
            })

        }
    }


    // only Foods

    else if (req.body.drinkID == '' || req.body.drinkID === undefined) {
        if (Array.isArray(req.body.foodID))
            fid = req.body.foodID;

        else fid[0] = req.body.foodID;

        for (var i = 0; i < req.body.qtyFood.length; i++) {
            if (req.body.qtyFood[i] != '') {
                qtyf[j] = req.body.qtyFood[i];
                pricef[j] = req.body.priceFood[i];
                j++;
            }
        }

        for (var i = 0; i < fid.length; i++) {
            total += pricef[i] * qtyf[i];
        }

        if (fid.length === 1) {
            Food.findOne({ foodID: fid[0] }, (err, f) => {
                ftitle[0] = f.title

                insertRecord(req, res)
            })
        }

        else {
            Food.find({ foodID: fid }, (err, f) => {

                for (var i = 0; i < f.length; i++) {
                    ftitle[i] = f[i].title;
                }

                insertRecord(req, res)
            })

        }
    }


    //both Foods & Drinks

    else {   //food

        if (Array.isArray(req.body.foodID))
            fid = req.body.foodID;

        else fid[0] = req.body.foodID;

        for (var i = 0; i < req.body.qtyFood.length; i++) {
            if (req.body.qtyFood[i] != '') {
                qtyf[j] = req.body.qtyFood[i];
                pricef[j] = req.body.priceFood[i];
                j++;
            }
        }

        for (var i = 0; i < fid.length; i++) {
            total += pricef[i] * qtyf[i];
        }

        // drink

        if (Array.isArray(req.body.drinkID))
            did = req.body.drinkID;

        else did[0] = req.body.drinkID;

        for (var i = 0; i < req.body.qtyDrink.length; i++) {
            if (req.body.qtyDrink[i] != '') {
                qtyd[k] = req.body.qtyDrink[i];
                priced[k] = req.body.priceDrink[i];
                k++;
            }
        }

        for (var i = 0; i < did.length; i++) {
            total += priced[i] * qtyd[i];
        }

        if (fid.length === 1) {
            Food.findOne({ foodID: fid[0] }, (err, f) => {
                ftitle[0] = f.title

                if (did.length === 1) {
                    Drink.findOne({ drinkID: did[0] }, (err, d) => {
                        dtitle[0] = d.title

                        insertRecord(req, res)
                    })
                }

                else {
                    Drink.find({ drinkID: did }, (err, d) => {

                        for (var i = 0; i < d.length; i++) {
                            dtitle[i] = d[i].title;
                        }

                        insertRecord(req, res)
                    })

                }
            })
        }

        else {
            Food.find({ foodID: fid }, (err, f) => {

                for (var i = 0; i < f.length; i++) {
                    ftitle[i] = f[i].title;
                }

                if (did.length === 1) {
                    Drink.findOne({ drinkID: did[0] }, (err, d) => {
                        dtitle[0] = d.title

                        insertRecord(req, res)
                    })
                }

                else {
                    Drink.find({ drinkID: did }, (err, d) => {

                        for (var i = 0; i < d.length; i++) {
                            dtitle[i] = d[i].title;
                        }

                        insertRecord(req, res)
                    })

                }
            })

        }
    }

    function insertRecord(req, res) {
        var voucher = new Voucher()

        voucher.date = new Date().toDateString()
        voucher.time = new Date().toTimeString()
        voucher.category = tname
        voucher.ftitle = ftitle
        voucher.pricef = pricef
        voucher.qtyf = qtyf
        voucher.dtitle = dtitle
        voucher.priced = priced
        voucher.qtyd = qtyd
        voucher.total = total
        voucher.tax = total * 0.05
        voucher.grandtotal = total + (total * 0.05)

        console.log("Data Inserted", total * 0.05, total + (total * 0.05))

        voucher.save((err, doc) => {
            if (!err) {
                res.redirect('../fdDB')
            }

        })
    }

})

router.get('/voucher', (req, res) => {

    Voucher.find((err, docs) => {
        if (!err) {

            res.render('restaurant/voucher', {
                list: docs
            })
        }

        else {
            console.log('Error in retrieving voucher list : ' + err)
        }
    })
})

router.get('/cashier1', (req, res) => {

    Voucher.find((err, docs) => {
        if (!err) {

            res.render('restaurant/cashier1', {
                list: docs
            })
        }

        else {
            console.log('Error in retrieving voucher list : ' + err)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Voucher.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('../voucher')
        }

        else {
            console.log('Error in voucher : ' + err)
        }

    })
})

module.exports = router