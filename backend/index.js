const express = require('express')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser')
const port = 8888
require('dotenv').config();
const connect = require('./database')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
// const sessionVerification = require('../middleware/sessionVerification')

const sessionStore = new MySQLStore({}, connect);

app.use(express.json());
// app.use(cors())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

//session
app.use(session({
    key: 'session_user',
    secret: 'your-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    name: 'session_id',
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
        // maxAge: 2 * 60 * 60000,
        maxAge: 60000,
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
    }
}));



// const sender = process.env.EMAIL_NAME
// const pass = process.env.PASS
// const reciever = process.env.EMAIL_RECIEVER
// const service = process.env.EMAIL_SERVICE

const adminRoute = require('./routes/admin')
const emailRoute = require('./routes/email')
const generalRoute = require('./routes/general')
const transferRoute = require('./routes/transfer')
const breadRoute = require('./routes/bread')
const transportRoute = require('./routes/transport')

app.use('/admin', adminRoute)
app.use('/email', emailRoute)
app.use('/general', generalRoute)
app.use('/transfer', transferRoute)
app.use('/bread', breadRoute)
app.use('/transport', transportRoute)

app.get('/', (req, res) => {
    res.send('its working')
})

app.listen(port, () => {
    console.log(`live on port ${port}`)
})

// module.exports = { sender, pass, reciever, service }