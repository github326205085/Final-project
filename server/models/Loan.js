const mongoose = require('mongoose')
const weftSchema = require('./steps')
const loanSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Request",
    },  
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", 
    },
    status: {//החזיר או לא
        type: Boolean,
        default: false
    }, 
    take: {//קבל או לא
        type: Boolean,
        default: false
    },
    returnDate: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    sign: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    approval: {//אושר / לא השטר 
        type: Boolean,
        default: false
    },
    wefts: [weftSchema],
    img:{
        type: mongoose.Schema.Types.String
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Loan', loanSchema)
