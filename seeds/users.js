const mongoose = require('mongoose')
const User = mongoose.model('User');

const users = [
    {
        username: 'adminjamie',
        loginType: 'normal',
        password: '123456',
        displayName: 'nongsathira',
        role: 'admin',
        avatarURL: 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png',
        active: true,
        bio: 'มึงเป็นเดเวลอปเปอ ไม่ใช่โปรแกรมเมอนะเว้ย',
        email: 'jamie@ku.th',
        firstName: 'Jamie',
        lastName: 'Sathira',
        mobilePhone: '0951923921',
        contacts: 'หนองจอก',
    }
]

User.insertMany(users, function (err) {
    if (err)
        return console.error(err)
    console.log("Users have been saved in User collection!")
})

