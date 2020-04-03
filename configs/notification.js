const { Expo } = require('expo-server-sdk')
const expo = new Expo()

module.exports = function (notifications) {
    let chunks = expo.chunkPushNotifications(notifications)
    for (let chunk of chunks)
        expo.sendPushNotificationsAsync(chunk)
}