const express = require('express')
const router = express.Router()
const connect = require('../database')
const nodemailer = require('nodemailer');

// creating a ticket
router.post('/add', async (req, res) => {
    if (!req) { return res.status(400) }

    const { name, department, description, type, anydesk } = req.body

    const date = new Date()

    const status = 'pending'

    try {
        // Insert into database
        await new Promise((resolve, reject) => {
            connect.query(
                'INSERT INTO general (name, department, date, description, request_type, status, anydesk) VALUES (?,?,?,?,?,?,?)',
                [name, department, date, description, type, status, anydesk],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: 'ticket-alerts@providencehumancapital.com',  // Use environment variables
                pass: 'Y@235813455857on',
            },
        });

        const mailOptions = {
            from: 'ticket-alerts@providencehumancapital.com',
            to: 'tickets@providencehumancapital.com',
            subject: 'New Ticket',
            text: `Hi Team, \n\nThere is a new ticket from ${name}, their request description is:\n\n${description}\n\nRegards \nTicket Alerts`,
        };

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return reject(error);
                resolve(info);
            });
        });

        res.status(200).send('Data inserted and email sent successfully');
    } catch (error) {
        console.error('Error:', error.stack);
        res.status(500).send('An error occurred: ' + error.message);
    }
})

//getting requests

router.get('/all', async (req, res) => {
    connect.query('SELECT * FROM general', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/pending', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "pending"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/progress', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "in-progress"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/completed', async (req, res) => {
    connect.query('SELECT * FROM general WHERE status = "completed"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

//updating database status

router.put('/pending/update', async (req, res) => {
    const { officer, id } = req.body
    //also need to get the it officer to the update the db

    connect.query('UPDATE general SET status = "in-progress", it_officer = ? WHERE id = ?', [officer, id], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }
        res.send(results);
        // console.log('working');
    })

})

router.put('/progress/update', async (req, res) => {
    const { id } = req.body

    connect.query('UPDATE general SET status = "completed" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }
        // console.log(id)
        res.send(results);
        // console.log('working');
    })

})

//reversing database status
router.put('/progress/reverse', async (req, res) => {
    const { id } = req.body

    connect.query('UPDATE general SET status = "pending", it_officer = " " WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Reversal error ');
            return;
        }
        res.send(results);
        // console.log('working');
    })

})

router.put('/completed/reverse', async (req, res) => {
    const { id } = req.body

    connect.query('UPDATE general SET status = "in-progress" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Reversal error ');
            return;
        }
        // console.log(id)
        res.send(results);
        // console.log('working');
    })

})


module.exports = router