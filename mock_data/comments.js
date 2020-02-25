const Comment = require('../models/comments')
const mongoose = require('mongoose')

const arr = [
    {
        text: "ที่สุดเลยเว่ยแก",
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247'),
        like: [
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079245'),
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247')
        ]
    },
    {
        text: "น่าสนใจ",
        user: mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079247'),
        like: [
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079248'),
            mongoose.Types.ObjectId('5e54c91c2c9d7dfb05079249')
        ]
    }
]
function insertManyData() {
    for (const user of arr) {
        const testUser = new Comment(
            user
        )
        testUser.save(function (err) {
            if (err) throw err;
            console.log("Comment has been saved to Comment collection!")
        });
    }
}

insertManyData()
