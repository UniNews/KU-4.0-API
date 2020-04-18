const kuacoustic = require('./store/kuacoustic')

const insertMany = async () => {
    await kuacoustic()
}

module.exports = insertMany