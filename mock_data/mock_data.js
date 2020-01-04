require('dotenv').config({ path: '../.env' })
const News = require('../models/news')
const arr = [
    { 
        title: 'jamie',
        description: 'potential',
        type: 'club',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                name: 'varit',
                text: 'เอ๋อสัส'
            },
            {
                name: 'varit',
                text: 'โพเทนเชี่ย'
            }
        ]
    },
    { 
        title: 'jamie',
        description: 'potential',
        type: 'club',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'general',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'general',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    }
]
News.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})

