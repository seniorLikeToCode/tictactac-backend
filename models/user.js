const mongoose = require('mongoose')
const Schema = mongoose.Schema

userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    gamePlayed: { type: Array, items: { type: String } },
})

User = mongoose.model('User', userSchema)
module.exports = User