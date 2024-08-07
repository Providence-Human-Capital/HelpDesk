const express = require('express')
const router = express.Router()
const connect = require('../database')

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400) }

    const { name, department, description, type, anydesk } = req.body

    const date = new Date()

    const status = 'pending'

    connect.query('INSERT INTO general (name, department, date, description, request_type, status, anydesk) VALUES (?,?,?,?,?,?,?)', [name, department, date, description, type, status, anydesk], (error, results) => {
        if (error) {
            res.send('Error executing query:', error.stack);
            return;
        }
        res.send(results)
        console.log('working')
    })
})

router.post('/info', async (req, res) => {
    // connect.query('SELECT * FROM general')

    res.send('getting data')
})

module.exports = router