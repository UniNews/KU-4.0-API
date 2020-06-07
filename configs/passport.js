const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../configs/environments')

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({ username: username }).select('+password')
        if (!user)
            return done(null, false, { errors: 'username is invalid' })
        const isMatch = await user.comparePassword(password)
        if (!isMatch)
            return done(null, false, { errors: 'password is invalid' })
        return done(null, user)
    }
    catch (err) {
        return done(err)
    }
}))

passport.use(new FacebookTokenStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ 'uid': profile.id })
        if (user)
            return done(null, user)
        // the user hasn't already been registered
        const { id, displayName, photos } = profile
        const createdUser = await User.create({
            uid: id,
            displayName: displayName.substring(0, 20).split(' ')[0],
            loginType: 'facebook',
            avatarURL: photos[0].value
        })
        return done(null, createdUser)
    } catch (err) {
        return done(err)
    }
}))

passport.use(new GoogleTokenStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = await User.findOne({ 'uid': profile.id })
        if (user)
            return done(null, user)
        // the user hasn't already been registered
        const { id, displayName } = profile
        const createdUser = await User.create({
            uid: id,
            displayName: displayName.substring(0, 20).split(' ')[0],
            loginType: 'google',
            avatarURL: profile._json.picture
        })
        return done(null, createdUser)
    } catch (err) {
        return done(err)
    }
}))