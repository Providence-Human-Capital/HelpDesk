const express = require('express')
const router = express.Router()
const connect = require('../database')
const bcrypt = require('bcrypt')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({}, connect);

//session
router.use(session({
    key: 'session_cookie_name',
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
        maxAge: 5 * 60 * 1000,
        secure: false // Set to true if using HTTPS
    }
}));

// let req.session.username

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

                req.session.save(() => {
                    req.session.logged_in = true
                    req.session.username = username
                })

            } else {
                res.sendStatus(401);
            }
        } catch (compareError) {
            console.error('Bcrypt compare error:', compareError);
            res.sendStatus(500);
        }

        console.log(req.session.username)

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

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.send('Logged out successfully!');
    });
})

router.get('/test', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome back, ${req.session.username}!`);
        console.log(req.session.username)
    } else {
        res.status(401).send('Please log in first.');
        console.log(req.session.username)
    }
})

module.exports = router