require('dotenv').config({ path: '../.env' })
const News = require('../models/news')
const uniqid = require('uniqid')

const arr = [
    { 
        title: 'jamie',
        description: 'potential',
        type: 'club',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {   
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส'
            },
            {
                id: uniqid(),
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
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'universities',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'universities',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'promotions',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                id: uniqid(),
                name: 'varit',
                text: 'เอ๋อสัส'
            }
        ]
    },
    { 
        title: 'varit',
        description: 'assava',
        type: 'lost-founds',
        name: 'CPE-KU',
        views: 0,
        comments:[
            {
                id: uniqid(),
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

