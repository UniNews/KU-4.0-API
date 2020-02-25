const mongoose = require("../configs/database");
const Comment = require('./comments');
const communitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'User', 
        required: true,
    },
    like: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: 'User' 
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
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
    }
})

module.exports = mongoose.model('Communities', communitySchema)