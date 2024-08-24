const express = require('express')
const router = express.Router()
const connect = require('../database')

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { name, department, white, brown, wholewheat } = req.body

    const date = new Date()

    connect.query('INSERT INTO bread (name, department, white, brown, wholewheat, date) VALUES (?,?,?,?,?,?)', [name, department, white, brown, wholewheat, date], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    })
})

router.get('/all', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    connect.query('SELECT * FROM bread', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    })
})

router.post('/week', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { selectedDate } = req.body
    const date = new Date

    connect.query('SELECT * FROM bread WHERE date BETWEEN ? AND ?', [selectedDate, date], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    })
})

module.exports = router