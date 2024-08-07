const express = require('express')
const router = express.Router()

router.post('/request', async (req, res) => {
    res.send('transfer request')
})

router.post('/request', async (req, res) => {
    res.send('transfer request')
})

module.exports = router