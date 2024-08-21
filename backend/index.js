const express = require('express')
const cors = require('cors');
const app = express()
const port = 8880
require('dotenv').config();

app.use(express.json());
app.use(cors())
// app.use(cors({
//     origin: ['http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT'],
//     credentials: true
// }))

// const sender = process.env.EMAIL_NAME
// const pass = process.env.PASS
// const reciever = process.env.EMAIL_RECIEVER
// const service = process.env.EMAIL_SERVICE

const adminRoute = require('./routes/admin')
const emailRoute = require('./routes/email')
const generalRoute = require('./routes/general')
const transferRoute = require('./routes/transfer')

app.use('/admin', adminRoute)
app.use('/email', emailRoute)
app.use('/general', generalRoute)
app.use('/transfer', transferRoute)

app.get('/', (req, res) => {
    res.send('its working')
    console.log(process.env.EMAIL_NAME)
})

app.listen(port, () => {
    console.log(`live on port ${port}`)
})

// module.exports = { sender, pass, reciever, service }