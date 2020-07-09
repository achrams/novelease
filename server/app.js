if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
    console.log('using env')
}

const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routers)
app.use(errorHandler)

module.exports = server