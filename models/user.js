const mongoose = require("../configs/database")
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false
    },
    displayName: {
        type: String,
        required: true
    },
    accessType: {
        type: String,
        required: false
    },
    avatarURl: {
        type: String,
        required: true,
        default: 'https://discovery-park.co.uk/wp-content/uploads/2017/06/avatar-default.png'
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    mobilePhone: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    following: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User' 
        }
    ],
    follower: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User' 
        }
    ],
    category: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    fbPage: {
        type: String,
        required: false
    },
    loginType: {
        type: String,
        required: false
    }
})

userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

// userSchema.pre('updateOne', function (next) {
//     var user = this._update.$set
//     try{
//         console.log(user.password)
//         if (!user.password) return next()
//         console.log(user.password,'sss')
//         bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//             if (err)
//                 return next(err)
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) return next(err)
//                 user.password = hash
//                 next()
//             })
//         })
//     }catch (error){
//         return next()
//     }
// })

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)