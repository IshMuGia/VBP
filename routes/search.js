const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Search = require('../models/Search');

router.post("/", (req, res) => {
    var email = req.session.email;
    var word = req.body.word; {
        const newsearch = new Search({
            _id: new mongoose.Types.ObjectId(),
            word: word,
            email: email
        });
        console.log(newsearch)
        newsearch
            .save()
            .then(Search => {
                console.log("Added to Search Collection");
            })
        Sol.find({ brand: word },'brand -_id')
            .exec()
            .then(results => {
                if (results) {
                    console.log(results);
                    res.redirect("/Vcharts/?brand="+results[0].brand);
                } else { console.log("Empty") }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
});

module.exports = router;