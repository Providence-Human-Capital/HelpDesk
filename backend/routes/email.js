const express = require('express')
const router = express.Router()

router.post('/request', async (req, res) => {
    res.send('email request')
})

router.post('/info', async (req, res) => {
    res.send('email info')
})

router.post('/individual', async (req, res) => {
    res.send('individual email record')
})

module.exports = email