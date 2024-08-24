const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost',     // Your MySQL host
    user: 'root',          // Your MySQL user
    password: '',  // Your MySQL password
    database: 'helpdesk'
    // database: 'testdesk'
});

connect.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connect.threadId);
});

module.exports = connect