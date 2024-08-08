const express = require('express')
const router = express.Router()
const connect = require('../database')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    if (!req) { return res.status(400) }

    const { username, password } = req.body

    connect.query('SELECT * FROM admin WHERE username = (?)', [username], async (error, results) => {
        // console.log(results[0].password)
        if (error) {
            return res.sendStatus(404);
        } else if (results[0].length === 0) {
            return res.sendStatus(401);
        }

        try {
            const isMatch = await bcrypt.compare(password, results[0].password);

            if (isMatch) {
                res.send(results);
            } else {
                res.sendStatus(401);
            }
        } catch (compareError) {
            console.error('Bcrypt compare error:', compareError);
            res.sendStatus(500);
        }

    })
})

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400) }

    const { username, email, password } = req.body

    try {
        const hashPass = await bcrypt.hash(password, 10);

        connect.query('INSERT INTO admin (username, email, password) VALUES (?, ?, ?)', [username, email, hashPass], (error, results) => {
            if (error) {
                console.error('Error executing query:', error.stack);
                return res.status(500).send('Error executing query');
            }
            res.status(201).send(results);
            console.log('User added successfully');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Server error');
    }

})

module.exports = router