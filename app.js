const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


require('./utils/db').connect()

const user = require('./routes/router')

const app = express() 
app.use(cors())
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', user)


app.listen(process.env.port || 8080, () => {
    console.log('Server started')
})   

