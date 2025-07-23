const mongoose = require('mongoose')

const roadmapSchema = new mongoose.Schema({
    careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: true
    },
    stepTitle: {
        type: String,
        required: true
    },
    stepDescription: {
        type: String
    },
    youtubeLink: {
        type: String
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
