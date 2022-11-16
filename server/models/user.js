const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    image: { type: String, required: true },
    saved: { type: Array },
    rated: { type: Array },

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)