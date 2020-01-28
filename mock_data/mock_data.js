const News = require('../models/news')
const mongoose = require('mongoose')

const arr = [
    {
        title: 'jamie',
        description: "ชมรม หรือ องค์กรไหนต้องการใช้ห้องสามารถมาจองได้ทุกหน่วยงานเลยน้าาา พี่ๆที่นี้ดูแลมาก และสำคัญที่สุดคือ ห้องเขาดีย์มากกกกก",
        type: 'club',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91423'),
        imageURL:'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232'),
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48233')
        ]
    },
    {
        title: 'jamie',
        description: 'potential',
        type: 'club',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91423'),
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232')
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'universities',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91424'),
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232')
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'universities',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91424'),
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232')
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'promotions',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91425'),
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232')
        ]
    },
    {
        title: 'varit',
        description: 'assava',
        type: 'lost-founds',
        imageURL: 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/23561811_1135234089912337_1179326037024457840_n.jpg?_nc_cat=109&_nc_eui2=AeFysjOSF3xWYESqfcW9KoHTtcWYukLTo6KzeQLj_DTyUjTJjzlKkx4RDrPSWYM2daroDOaawb1Ks0fW3Fz9oIYAx2WvwmKFACAYgxcqXPLbjA&_nc_ohc=L_CxCVBf3e4AX_obb7O&_nc_ht=scontent.fbkk22-2.fna&oh=f289d7c81f072c185ad16aac05f3d340&oe=5E9B6E97',
        user: mongoose.Types.ObjectId('5e2da6d4fc633f58c9c91424'),
        views: 0,
        comments: [
            mongoose.Types.ObjectId('5e2f373c4699ed62bfa48232')
        ]
    }
]
News.insertMany(arr, function (err, news) {
    if (err) return console.error(err)
    console.log(" saved to collection.")
})

