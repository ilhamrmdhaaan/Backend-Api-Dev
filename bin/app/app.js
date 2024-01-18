require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')


const app = express()
app.use(cors())
app.use(logger('combined'))
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.get('/', function (req, res, next) {
    res.send('backend service')
 })


const UserRouter = require('../modules/auth/auth')
const ClockInRouter = require('../modules/clock_in/clockIn')
const ClockOutRouter = require('../modules/clock_out/clockOut')

app.use('/v1/auth/',  UserRouter)
app.use('/v1/clock/',  ClockInRouter)
app.use('/v1/clock/',  ClockOutRouter)

module.exports = app