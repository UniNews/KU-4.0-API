const Community = require('../models/community')
const mongoose = require('mongoose')

const arr = [
    {
        description: "รักเธอคนนี้ยี่สิบสี่ชั่วโมง เช้าสายบ่ายเย็นก็ยัง I love you",
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247'),
        comments: [],
        tags:['ความรัก'],
        like: [
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079248'),
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079249')
        ]
    },
    {
        description: "เด็กเอ๋ยเด็กดีต้องมีหน้าที่10อย่างด้วยกัน",
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247'),
        comments: [],
        tags:['การเรียน'],
        like: [
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079248')
        ]
    },
    {
        description: "ไปนีโอกันป่ะะ",
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247'),
        comments: [],
        tags:['กีฬา']
    },
]
Community.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})

