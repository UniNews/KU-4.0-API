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
const kuadmission = require('./store/kuadmission')
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
    await kuadmission()
}

module.exports = insertMany