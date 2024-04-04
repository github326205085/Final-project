const mongoose = require('mongoose')
const requestSchema = new mongoose.Schema({
    AskDate: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date() + 7 * 24 * 60 * 60 * 1000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",

    },
    count: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})
module.exports = mongoose.model('Request', requestSchema)