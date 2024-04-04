const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },

    identity: {
        type: mongoose.Schema.Types.String,
        required: true,
        maxLength: 9,
        maxLength: 9,
        unique: true
    },

    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    phone: {
        type: mongoose.Schema.Types.String,
        maxLength: 10,
        required: true
    },

    email: {
        type: mongoose.Schema.Types.String,
    },

    active: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum:["edmit","user"],
        default: "user"
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('User', usersSchema)