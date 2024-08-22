const express = require('express')
const router = express.Router()
const connect = require('../database')
const bcrypt = require('bcrypt')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({}, connect);

//session
router.use(session({
    key: 'session_user',
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
        maxAge: 2 * 60 * 1000,
        secure: false // Set to true if using HTTPS
    }
}));


router.post('/login', async (req, res) => {
    if (!req) { return res.status(400) }

    const { username, password } = req.body
    const date = new Date()

    const dangerousPattern = /[<>\/\\\|:"'*?;]/g

    if (dangerousPattern.test(username) || dangerousPattern.test(password)) {
        return res.status(400).send('Your credentials have dangerous characters')
    }


    connect.query('SELECT * FROM admin WHERE username = (?)', [username], async (error, results) => {
        // console.log(results)
        if (error) {
            return res.status(404).send('Error logging in');
            // console.log(error)
        } else if (results.length === 0) {
            return res.status(401).send('You are not an admin are you??, Please go elsewhere');
        } else {
            try {
                const isMatch = await bcrypt.compare(password, results[0].password);

                if (isMatch) {

                    connect.query('UPDATE admin SET last_login = ? WHERE username = ?', [date, username], async (error) => {
                        if (error) {
                            return res.status(500).send('Last login error');
                        }
                    })

                    res.send(results)
                } else {
                    res.status(201);
                }
            } catch (compareError) {
                console.error('Bcrypt compare error:', compareError);
                res.status(500);
            }
        }

    })
})

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400) }

    const { username, email, password, role, created } = req.body

    const date = new Date()

    const last_login = ''

    try {
        const hashPass = await bcrypt.hash(password, 10);

        connect.query('INSERT INTO admin (username, email, password, role, last_login, created_by, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, email, hashPass, role, last_login, created, date], (error, results) => {
            if (error) {
                console.error('Error executing query:', error.stack);
                return res.status(500).send('Error creating admin');
            }
            res.status(201).send(results);
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
        res.clearCookie('session_user');
        res.send('Logged out successfully!');
    });

    console.log(req.session)
})

router.get('/test', (req, res) => {
    // if (req.session.user) {
    //     res.send(`Welcome back, ${req.session.user}!`);
    //     console.log(req.session.username)
    // } else {
    //     res.status(401).send('Please log in first.');
    //     console.log(req.session.username)
    // }

    res.send(req.session.user)
    console.log(req.session.user)
})

module.exports = router