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

//getting requests

router.get('/all', async (req, res) => {
    connect.query('SELECT * FROM general', (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        res.send(results);
        console.log('working');
    });
});

router.get('/pending', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "pending"', (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        res.send(results);
        console.log('working');
    });
});

router.get('/progress', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "in-progress"', (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        res.send(results);
        console.log('working');
    });
});

router.get('/completed', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "completed"', (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        res.send(results);
        console.log('working');
    });
});

//updating database status

router.put('/pending/update', async (req, res) => {
    const { officer, id } = req.body
    //also need to get the it officer to the update the db

    connect.query('UPDATE general SET status = "in-progress", it_officer = ? WHERE id = ?', [officer, id], (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        res.send(results);
        console.log('working');
    })

})

router.put('/progress/update', async (req, res) => {
    const { id } = req.body

    connect.query('UPDATE general SET status = "completed" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.send('Error executing query: ' + error.stack);
            return;
        }
        console.log(id)
        res.send(results);
        console.log('working');
    })

})

module.exports = router