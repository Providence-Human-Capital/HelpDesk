const express = require('express')
const cors = require('cors');
const app = express()
const port = 8800

app.use(express.json());
app.use(cors())

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
    console.log('home')
})

app.listen(port, () => {
    console.log(`live on port ${port}`)
})