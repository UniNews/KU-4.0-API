require('dotenv').config({ path: '../.env' })
const mongoose = require("mongoose")
const News = require('../models/news')
var News1 = new News(
    { 
        title:'varit',
        description:'assava'
    }
)
News1.save(function (err, news) {
    if (err) return console.error(err);
    console.log(news.title + " saved to collection.")
})

