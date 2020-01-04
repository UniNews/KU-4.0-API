require('dotenv').config({ path: '../.env' })
const mongoose = require("mongoose")
const News = require('../models/news')
const arr = [
    { 
        title:'jamie',
        description:'potential',
        type:'club'
    },
    { 
        title:'jamie',
        description:'potential',
        type:'club'
    },
    { 
        title:'varit',
        description:'assava',
        type:'general'
    },
    { 
        title:'varit',
        description:'assava',
        type:'general'
    }
]
News.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})
// var News1 = new News(
//     { 
//         title:'varit',
//         description:'assava',
//         type:'club'
//     }
// )

// News1.save(function (err, news) {
//     if (err) return console.error(err);
//     console.log(news.title + " saved to collection.")
// })

