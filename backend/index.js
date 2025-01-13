const express = require('express')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser')
const port = 8888
require('dotenv').config();

app.use(express.json());
// app.use(cors())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

// const sender = process.env.EMAIL_NAME
// const pass = process.env.PASS
// const reciever = process.env.EMAIL_RECIEVER
// const service = process.env.EMAIL_SERVICE

const adminRoute = require('./routes/admin')
const emailRoute = require('./routes/email')
const generalRoute = require('./routes/general')
const transferRoute = require('./routes/transfer')
const breadRoute = require('./routes/bread')
const transportRoute = require('./routes/transport')

app.use('/admin', adminRoute)
app.use('/email', emailRoute)
app.use('/general', generalRoute)
app.use('/transfer', transferRoute)
app.use('/bread', breadRoute)
app.use('/transport', transportRoute)

app.get('/', (req, res) => {
    res.send('its working')
})

app.listen(port, () => {
    console.log(`live on port ${port}`)
})

// module.exports = { sender, pass, reciever, service }