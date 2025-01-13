const express = require('express')
const router = express.Router()
const connect = require('../database')
const bcrypt = require('bcrypt')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionVerification = require('../middleware/sessionVerification')

const sessionStore = new MySQLStore({}, connect);

//session
router.use(session({
    key: 'session_user',
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    name: 'session_id',
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
        maxAge: 2 * 60 * 60000,
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
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

                    req.session.username = username
                    req.session.visited = true // to avoid having multiple sessions for the same user
                    // res.cookie('cookie', 'working', {maxAge: 6000})


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


router.post('/add', sessionVerification, async (req, res) => {
    if (!req) { return res.status(400) }

    const { username, email, password, role, created } = req.body

    const date = new Date()

    const last_login = ''

    connect.query('SELECT * FROM admin WHERE username = ? OR email = ?', [username, email], async(error, results) =>{
        if(error){
            return res.status(404).send('Error adding a new user');
        }else if(results){
            return res.status(404).send('That username or email is already in use')
        }else{

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
        }
    })

    

})


router.post('/logout', sessionVerification, (req, res) => {

    console.log(req.headers)
    
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        console.log(req.session)
        res.clearCookie('session_id');
        // res.send('Logged out successfully!');

    });

})



router.get('/test', sessionVerification, (req, res) => {

    // res.send(req.session.user)
    // console.log(req.cookies, 'coooooookie')
    // console.log(req.session.username)
    console.log(req.headers.cookie)
    res.status(200)
})

module.exports = router