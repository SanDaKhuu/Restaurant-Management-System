const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')

const Food = mongoose.model('Food')
const Drink = mongoose.model('Drink')
const Table = mongoose.model('Table')
const Admin = mongoose.model('Admin')
const Staff = mongoose.model('Staff')
const Voucher = mongoose.model('Voucher')

router.get('/', (req, res) => {
    Food.find((err3, food) => {
        Drink.find((err4, drink) => {
            Table.find((err5, table) => {
                res.render('restaurant/waiter1', {
                    list: food,
                    item: drink,
                    table: table
                })
            })
        })
    })

})

router.post('/', (req, res) => {
    var username = req.body.username;
    var password = req.body.pass;
    Admin.findOne({ email: username }, (err, admin) => {

        if (!admin) {
            return res.status(404).send("Email not found on admin list");
        }

        else {
            if (admin.psw1 === password) {
                Staff.findOne({ staffID: admin.staffID }, (err2, staff) => {
                    if (!staff)
                        res.send("You are not our staff !!")

                    else if (staff.position === 'Waiter' || staff.position === 'Manager') {
                        Food.find((err3, food) => {
                            Drink.find((err4, drink) => {
                                Table.find((err5, table) => {
                                    res.render('restaurant/waiter1', {
                                        list: food,
                                        item: drink,
                                        table: table
                                    })
                                })
                            })
                        })
                    }

                    else res.send("You don't have access to this page")
                })

            }

            else res.send("Password incorrect")
        }
    })

})

router.post('/kitchen', (req, res) => {
    var username = req.body.username;
    var password = req.body.pass;
    Admin.findOne({ email: username }, (err, admin) => {

        if (!admin) {
            return res.status(404).send("Email not found on admin list");
        }

        else {
            if (admin.psw1 === password) {
                Staff.findOne({ staffID: admin.staffID }, (err2, staff) => {
                    if (!staff)
                        res.send("You are not our staff !!")

                    else if (staff.position === 'Kitchen Helper' || staff.position === 'Chef' || staff.position === 'Manager') {
                        res.render('restaurant/kitchen1')
                    }

                    else res.send("You don't have access to this page")
                })

            }

            else res.send("Password incorrect")
        }
    })

})

router.post('/cashier', (req, res) => {
    var username = req.body.username;
    var password = req.body.pass;
    Admin.findOne({ email: username }, (err, admin) => {

        if (!admin) {
            return res.status(404).send("Email not found on admin list");
        }

        else {
            if (admin.psw1 === password) {
                Staff.findOne({ staffID: admin.staffID }, (err2, staff) => {
                    if (!staff)
                        res.send("You are not our staff !!")

                    else if (staff.position === 'Cashier' || staff.position === 'Manager') {
                        Voucher.find((err, vou) => {
                            res.render('restaurant/cashier1', {
                                list: vou
                            })
                        })
                    }

                    else res.send("You don't have access to this page")
                })

            }

            else res.send("Password incorrect")
        }
    })

})

router.post('/admin', (req, res) => {
    var username = req.body.username;
    var password = req.body.pass;
    Admin.findOne({ email: username }, (err, admin) => {

        if (!admin) {
            return res.status(404).send("Email not found on admin list");
        }

        else {
            if (admin.psw1 === password) {
                Staff.findOne({ staffID: admin.staffID }, (err2, staff) => {
                    if (!staff)
                        res.send("You are not our staff !!")

                    else if (staff.position === 'CEO' || staff.position === 'Manager') {

                        Admin.find((err, ad) => {
                            res.render('restaurant/list', {
                                list: ad
                            })
                        })

                    }

                    else res.send("You don't have access to this page")
                })

            }

            else res.send("Password incorrect")
        }
    })

})

router.get('/order2', (req, res) => {

    Food.find((err, docs1) => {
        Drink.find((err, docs2) => {
            res.render('restaurant/order2', {
                list: docs1,
                item: docs2
            })
        })
    })

})

module.exports = router