const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Act = require('../models/ActivityLog');
const multer = require('multer');
// Load User model
const User = require('../models/Users');

//Register handle
router.post("/", (req, res) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var bname = req.body.b_name
    var b_role = req.body.b_role
    var b_add = req.body.b_add
    var biz_size = req.body.size
    var password = req.body.password
    var img = req.body.image
    console.log(biz_size)
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
                const msg1 = "User already exists!";
                const msg = "";
                var rec = new Object();
                rec.msg1 = msg1;
                rec.msg = msg;
                res.render('myaccount', { rec: rec });

                console.log("email exists");
            } else {

                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    phone: phone,
                    email: email,
                    biz_name: bname,
                    biz_role: b_role,
                    biz_add: b_add,
                    biz_size: biz_size,
                    password: password
                });
                //console.log(newUser)
                    //hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //Set password to hash
                        newUser.password = hash;
                        //Save user
                        newUser
                            .save()
                            .then(user => {
                                req.session.email = req.body.email
                                req.session.password = req.body.password
                                req.session.uid = user._id;
                                //console.log(re)
                                // const m = "Save Product";
                                // req.session.alert = m
                                var currentDate = new Date();
                                req.session.logdate = currentDate;
                                console.log(req.session.uid);
                                const newLog = new Act({
                                    email: req.session.email,
                                    login: currentDate
                                });
                                newLog
                                    .save() 
                                    .then(r => {
                                        //console.log(user._id)
                                        return res.redirect('/charts');
                                    });
                            })
                    });
                });
                //console.log(newUser);
                //res.send('hello');
            }
        });

});
module.exports = router;