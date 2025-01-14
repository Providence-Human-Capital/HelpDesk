const express = require('express')
const router = express.Router()
const connect = require('../database')
const nodemailer = require('nodemailer');
require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionVerification = require('../middleware/sessionVerification')

const sessionStore = new MySQLStore({}, connect);

// const sender = process.env.EMAIL_NAME
// const pass = process.env.PASS
// const reciever = process.env.EMAIL_RECIEVER
// const service = process.env.EMAIL_SERVICE

router.use(session({
    key: 'session_user',
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    name: 'session_id',
    cookie: {
        maxAge: 2 * 60 * 60000,
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
    }
}));

// creating a ticket
router.post('/add', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { firstname, lastname, department, description, type, anydesk } = req.body

    const date = new Date()

    const status = 'pending'

    const dangerousPattern = /[<>\/\\\|:"'*?;]/g

    if (dangerousPattern.test(firstname) || dangerousPattern.test(lastname) || dangerousPattern.test(department) || dangerousPattern.test(description)) {
        return res.status(400).send('Your input has invalid characters')
    }

    try {
        // Insert into database
        await new Promise((resolve, reject) => {
            connect.query(
                'INSERT INTO general (firstname, lastname, department, date, description, request_type, status, anydesk) VALUES (?,?,?,?,?,?,?,?)',
                [firstname, lastname, department, date, description, type, status, anydesk],
                (error, results) => {
                    if (error) return reject(error);
                    resolve(results);
                }
            );
        });

        // Send email
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_NAME,  // Use environment variables
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: process.env.EMAIL_RECIEVER,
            subject: 'New Ticket',
            text: `Hi Team, \n\nThere is a new ticket from ${firstname} ${lastname} (${department}), their request description is:\n\n${description}\n\nRegards \nTicket Alerts`,
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

router.get('/all',sessionVerification, async (req, res) => {
    console.log(req.session.username)
    console.log(req.headers.cookie)
    if (!req) { return res.status(400).send('There has been a problem') } // console.log(req.session)
    connect.query('SELECT * FROM general', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
    });
});

router.get('/pending',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    connect.query('SELECT * FROM general WHERE status = "pending"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/progress',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    connect.query('SELECT * FROM general WHERE status = "in-progress"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/unfinished',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    connect.query('SELECT * FROM general WHERE status = "unfinished"', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(results);
        // console.log('working');
    });
});

router.get('/completed',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
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

router.put('/pending/update',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
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

router.put('/progress/update',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body

    connect.query('UPDATE general SET status = "completed" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }
        // console.log(id)
        res.send(results);
        // send email?????
    })

})

//reversing database status
router.put('/progress/reverse',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body

    connect.query('UPDATE general SET status = "pending", it_officer = " " WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Reversal error');
            return;
        }
        res.send(results);
        // console.log('working');
    })

})

router.put('/completed/reverse',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body

    connect.query('UPDATE general SET status = "in-progress" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Reversal error');
            return;
        }
        // console.log(id)
        res.send(results);
        // console.log('working');
    })

})

//unfinished
router.put('/progress/unfinished',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id, reason } = req.body

    connect.query('UPDATE general SET status = "unfinished" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }

        res.send(results)
    })
})

router.put('/unfinished/update',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }
    const { id } = req.body

    connect.query('UPDATE general SET status = "completed" WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }

        res.send(results)
    })
})

// filtered
router.post('/filter',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { startDate, endDate } = req.body
    // console.log(date)

    connect.query('SELECT * FROM general WHERE DATE(date) BETWEEN ? AND ?', [startDate, endDate], (error, results) => {
        if (error) {
            res.status(500).send('Error updating database');
            return;
        }

        res.send(results)
    })
})

module.exports = router