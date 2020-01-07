const User = require('../models/user')

const testUser = new User({
    username: 'mond',
    password: '123',
    displayName: 'test'
});

testUser.save(function (err) {
    if (err) throw err;
    console.log("User has been saved to User collection!")
});