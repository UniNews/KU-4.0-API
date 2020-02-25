const mongoose = require("../configs/database");
const Comment = require('./comments');
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
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
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
        type: Array,
        required: true
    },
    comments: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: Comment
        }
    ],
    tags: {
        type:Array,
        required:false
    },
    like: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User' 
        }
    ]
})

module.exports = mongoose.model('News', newsSchema,'newsCollection')