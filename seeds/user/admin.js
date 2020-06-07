const mongoose = require('mongoose')
const User = mongoose.model('User')

const users = [{
    username: 'adminjamie',
    loginType: 'normal',
    password: '123456',
    displayName: 'adminjamie',
    role: 'admin',
    avatarURL: 'https://i.ytimg.com/vi/0rX2DnIhJvU/maxresdefault.jpg',
    active: true,
    bio: `พวกมึงเคยเสียภาษีรึเปล่า ไอ้เด็กกระโปก`,
    email: 'adminjamie@ku.th',
    firstName: 'ผู้กอง',
    lastName: 'เจมมี่',
    mobilePhone: '0951923921',
    contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
},
{
    username: 'adminmond',
    loginType: 'normal',
    password: '123456',
    displayName: 'adminmond',
    role: 'admin',
    avatarURL: 'https://i.ytimg.com/vi/0rX2DnIhJvU/maxresdefault.jpg',
    active: true,
    bio: `พวกมึงเคยเสียภาษีรึเปล่า ไอ้เด็กกระโปก`,
    email: 'adminmond@ku.th',
    firstName: 'ผู้กอง',
    lastName: 'มอนด์',
    mobilePhone: '0951923921',
    contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
},
{
    username: 'adminpaul',
    loginType: 'normal',
    password: '123456',
    displayName: 'adminpaul',
    role: 'admin',
    avatarURL: 'https://i.ytimg.com/vi/0rX2DnIhJvU/maxresdefault.jpg',
    active: true,
    bio: `พวกมึงเคยเสียภาษีรึเปล่า ไอ้เด็กกระโปก`,
    email: 'adminpaul@ku.th',
    firstName: 'ผู้กอง',
    lastName: 'พอล',
    mobilePhone: '0951923921',
    contacts: 'มหาวิทยาลัยเกษตรศาสตร์',
}]

const insertMany = async () => {
    for (const user of users) {
        const createdUser = new User(user)
        await createdUser.setPassword(user.password)
        await createdUser.save()
    }
}

module.exports = insertMany