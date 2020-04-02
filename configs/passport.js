const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
const GoogleTokenStrategy = require('passport-google-token').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../configs/environments')

passport.use(new LocalStrategy(async function (username, password, done) {
    try {
        const user = await User.findOne({ username: username })
        if (!user || !user.comparePassword(password))
            return done(null, false, { errors: 'username or password is invalid' })
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
            done(null, user)
        // the user hasn't already been registered
        const { id, displayName, photos } = profile
        const createdUser = await User.create({
            uid: id,
            displayName: displayName,
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
            done(null, user)
        // the user hasn't already been registered
        const { id, name, profile_pic } = profile
        const createdUser = await User.create({
            uid: id,
            displayName: name,
            loginType: 'google',
            avatarURL: profile_pic
        })
        return done(null, createdUser)
    } catch (err) {
        return done(err)
    }
}))