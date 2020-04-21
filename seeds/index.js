/* stores */
const kuacoustic = require('./store/kuacoustic')
const kuchorus = require('./store/kuchorus')
const kudanceclub = require('./store/kudanceclub')
const kumashabu = require('./store/kumashabu')
const kuphotoclub = require('./store/kuphotoclub')
const kupotentialclub = require('./store/kupotentialclub')
const kuvolunteergroup = require('./store/kuvolunteergroup')
const nskkasetsart = require('./store/nskkasetsart')
const samsteak = require('./store/samsteak')
const speakerku = require('./store/speakerku')
const yujinshabu = require('./store/yujinshabu')
/* users */
const admin = require('./user/admin')

const insertMany = async () => {
    // await kuacoustic(),
    //     await kuchorus(),
    //     await kudanceclub(),
    //     await kumashabu(),
    //     await kuphotoclub(),
    //     await kupotentialclub(),
    //     await kuvolunteergroup(),
    //     await nskkasetsart(),
    //     await samsteak(),
    //     await speakerku(),
    //     await yujinshabu()
    await admin()
}

module.exports = insertMany