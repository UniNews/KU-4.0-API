const mongoose = require('mongoose')
const User = mongoose.model('User');

// Clubs
// const kupotentialclub = require('./store/kupotentialclub');
// const kuphotoclub = require('./store/kuphotoclub');
// const kuvolunteergroup = require('./store/kuvolunteergroup');
// const nskkasetsart = require('./store/nskkasetsart');
// const speakerku = require('./store/speakerku');
// const kudanceclub = require('./store/kudanceclub');
// const kuchorus = require('./store/kuchorus');
// const kuacoustic = require('./store/kuacoustic');

// Store
// const yujinshabu = require('./store/yujinshabu');
// const kumashabu = require('./store/kumashabu');
// const samsteak = require('./store/samsteak');

const users = [
    // {
    //     username: 'adminjamie',
    //     loginType: 'normal',
    //     password: '123456',
    //     displayName: 'nongsathira',
    //     role: 'admin',
    //     avatarURL: 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
    //     active: true,
    //     bio: 'มึงเป็นเดเวลอปเปอ ไม่ใช่โปรแกรมเมอนะเว้ย',
    //     email: 'jamie@ku.th',
    //     firstName: 'Jamie',
    //     lastName: 'Sathira',
    //     mobilePhone: '0951923921',
    //     contacts: 'หนองจอก',
    // },
    // kupotentialclub,
    // kuphotoclub,
    // kuvolunteergroup,
    // nskkasetsart,
    // speakerku,
    // kudanceclub,
    // kuchorus,
    // kuacoustic,
    // yujinshabu,
    // kumashabu,
    // samsteak,
]

User.insertMany(users, function (err) {
    if (err)
        return console.error(err)
    console.log("Users have been saved in User collection!")
})

