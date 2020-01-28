const Comment = require('../models/comments')
const mongoose = require('mongoose')

const arr = [
    {
        text: "เอ๋อสัส",
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91426'),
        like: [
            mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91426'),
            mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91427')
        ]
    },
    {
        text: "โพเทนเชี่ย",
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91426'),
        like: [
            mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91426'),
            mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91427')
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
