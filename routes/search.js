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
        Prod.find({ $or: [{ brand: word }, { sub_brand: word }, { model_no: word }, { s_des: word }]  })
            .exec()
            .then(results => {
                if (results) {
                    console.log(results);
                    res.render("shop", { results: results });
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