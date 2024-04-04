const mongoose = require('mongoose')
const weftSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        lowercase: true
    },

    phone: {
        type: mongoose.Schema.Types.String,
        maxLength: 10,
        required: true

    },
    sign: {
        type: mongoose.Schema.Types.String,
        required: true

    },
}, {
    timestamps: true
})
module.exports = weftSchema