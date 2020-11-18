const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rev = require("../models/Review");
const User = require('../models/Users');
// var Integer = require('integer');


router.post("/", (req, res) => {
    var rating = req.body.rating;
    var brand = req.body.brand;    
    var email = req.session.email;
    const newRev = new Rev({
    _id: new mongoose.Types.ObjectId(),
    rating: rating,
    email: email,
    brand: brand
    });
    //console.log(newRev)
    newRev
    .save()
    .then(rev => {
        Sol.find({
            brand: req.query.brand
        })
        .exec()
        .then(results => {
            console.log(results);
            res.render('charts', {
                results: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
        // Rev.aggregate([{
        //             $match: {
        //                 product: model_no
        //             }
        //         },
        //         {
        //             $group: {
        //                 _id: "$product",
        //                 avgRating: {
        //                     $avg: "$rating"
        //                 }
        //             }
        //         }
        //     ])
            // .then(avgR => {
            //     console.log("fdvhj vds");
            //     r = Math.round(avgR[0].avgRating);
            //     Prod.findOneAndUpdate(
            //         {model_no: model_no}, {rating: r})
            //         .then(doc => {
            //             res.redirect('/dproduct/?id=' + model_no);
            //         })
            //         .catch(err => {
            //             res.status(500).json({
            //                 error: err
            //             });
            //         });
            // })
            // .catch(err => {
            //     res.status(500).json({
            //         error: err
            //     });
            // });

    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
});

module.exports = router;
////let doc = await 