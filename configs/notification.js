const { Expo } = require('expo-server-sdk')
const expo = new Expo()

module.exports = async function (notifications) {
    try {
        let chunks = expo.chunkPushNotifications(notifications)
        for (let chunk of chunks)
            await expo.sendPushNotificationsAsync(chunk)
    }
    catch (err) {
        console.log(err)
    }
}