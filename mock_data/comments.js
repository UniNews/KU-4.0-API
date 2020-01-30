const Comment = require('../models/comments')
const mongoose = require('mongoose')

const arr = [
    {
        text: "ที่สุดเลยเว่ยแก",
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144325'),
        like: [
            mongoose.Types.ObjectId('5e32a25f3e65ba7204144325'),
            mongoose.Types.ObjectId('5e32a25f3e65ba7204144324')
        ]
    },
    {
        text: "น่าสนใจ",
        user: mongoose.Types.ObjectId('5e32a25f3e65ba7204144323'),
        like: [
            mongoose.Types.ObjectId('5e32a25f3e65ba7204144324'),
            mongoose.Types.ObjectId('5e32a25f3e65ba7204144323')
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
