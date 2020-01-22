const mongoose = require("../configs/database");

const reportSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    cid: {
        type: String,
        required: true
    },
    newsid: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Report', reportSchema,'reportCollection')