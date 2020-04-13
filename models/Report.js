const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postDestination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        enum: ['article', 'comment'],
        required: true
    }
}, { timestamps: true })

ReportSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        description: this.description,
        author: this.author.toJSONFor(user),
        postDestination: this.postDestination,
        type: this.type,
        createdAt: this.createdAt,
    }
}

mongoose.model('Report', ReportSchema)