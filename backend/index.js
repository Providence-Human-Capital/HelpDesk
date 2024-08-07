const express = require('express')
const cors = require('cors');
const app = express()
const port = 8800

app.use(express.json());
app.use(cors())



app.get('/', (req, res) => {
    res.send('its working')
    console.log('home')
})

app.listen(port, () => {
    console.log(`live on port ${port}`)
})