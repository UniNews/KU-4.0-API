/* stores */
const kuacoustic = require('./store/kuacoustic')
const kuchorus = require('./store/kuchorus')
const kudanceclub = require('./store/kudanceclub')
const kumashabu = require('./store/kumashabu')
const kuphotoclub = require('./store/kuphotoclub')
const kupotentialclub = require('./store/kupotentialclub')
const nskkasetsart = require('./store/nskkasetsart')
const speakerku = require('./store/speakerku')
const yujinshabu = require('./store/yujinshabu')
/* users */
const admin = require('./user/admin')

const insertMany = async () => {
    await kuacoustic()
    await kuchorus()
    await kudanceclub()
    await kumashabu()
    await kuphotoclub()
    await kupotentialclub()
    await nskkasetsart()
    await speakerku()
    await yujinshabu()
    await admin()
}

module.exports = insertMany