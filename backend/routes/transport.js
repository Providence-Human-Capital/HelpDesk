const express = require('express')
const router = express.Router()
const connect = require('../database')

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { firstname, lastname, email, department, start, destination, purpose, cargo, passengers, additional } = req.body

    const date = new Date()

    const fullEmail = email + '@providencehumancapital.com'

    const status = 'pending'

    const dangerousPattern = /[<>\/\\\|:"'*?;]/g

    if (dangerousPattern.test(firstname) || dangerousPattern.test(lastname) || dangerousPattern.test(email) || dangerousPattern.test(start) || dangerousPattern.test(destination) || dangerousPattern.test(purpose) || dangerousPattern.test(cargo)) {
        return res.status(400).send('Your input has invalid characters')
    }

    connect.query('INSERT INTO transport (firstname, lastname, email, department, date, start, destination, purpose, cargo, passengers,additional, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [firstname, lastname, fullEmail, department, date, start, destination, purpose, cargo, passengers, additional, status], (error, results) => {
        if (error) {
            res.status(500).send('Error sending request');
            return;
        }
        // console.log(results[0]);
        res.send(results)
    })
})

router.get('/all', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    connect.query('SELECT * FROM transport', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    });
})

router.get('/pending', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    connect.query('SELECT * FROM transport WHERE status = "pending"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    });
})

router.put('/pending/update', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body
    console.log(id)

    connect.query('UPDATE transport SET status = "approved" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    });
})

router.put('/pending/rejected', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body

    connect.query('UPDATE transport SET status = "rejected" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    });
})

module.exports = router