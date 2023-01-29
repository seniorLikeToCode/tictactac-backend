const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    gameId: { type: String, required: true },
    emailPlayer1: { type: String, required: true },
    player1username: { type: String, required: true },
    player2username: { type: String, required: true },
    emailPlayer2: { type: String, required: true },
    result: { type: String, default: 'none' },
    state: { type: Array, items: { type: String } },
    createdAt: { type: Date, default: Date.now },
})

Game = mongoose.model('Game', gameSchema)
module.exports = Game

