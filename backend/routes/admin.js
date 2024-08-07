const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
    res.send('admin login')
})

router.post('/add', async (req, res) => {
    res.send('add admin ')
})

module.exports = admin