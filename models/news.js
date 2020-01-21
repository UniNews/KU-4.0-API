const mongoose = require("../configs/database");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageURL: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('News', newsSchema,'newsCollection')