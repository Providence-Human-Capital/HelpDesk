const express = require('express')
const router = express.Router()

router.post('/add', async (req, res) => {
    res.send('general form')
})

router.post('/info', async (req, res) => {
    res.send('getting data')
})

module.exports = general