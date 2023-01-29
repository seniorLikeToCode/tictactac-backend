const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected')
    } catch (err) {
        console.log('DATABASE CONNECTION ERR: ', err.code)
    }

    mongoose.connection.on('error', err => console.error('DATABASE CONNECTION ERR: ', err.code))
    mongoose.connection.on('disconnected', () => console.log('Database disconnected'))
    mongoose.connection.on('reconnected', () => console.log('Database reconnected'))

    const gracefulExit = () => {
        mongoose.connection.close(() => {
            console.log('Database connection closed through app termination')
            process.exit(0)
        })
    }
}

module.exports = { connect }