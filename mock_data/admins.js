const Admin = require('../models/admin')

const testUser = new Admin({
    username: 'jamie',
    password: '5910545833',
    displayName: 'test'
});

testUser.save(function (err) {
    if (err) throw err;
    console.log("Admin has been saved to admin collection!")
});