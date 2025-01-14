const express = require('express')
const router = express.Router()
const connect = require('../database')
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const cron = require('node-cron');
const axios = require('axios')
const sessionVerification = require('../middleware/sessionVerification')
const { exec } = require('child_process');

const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'short',
}

const fileOptions = {
    month: 'short',
    day: '2-digit',
}

const monthFileOptions = {
    month: 'long',
}


router.post('/add',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { empNumber, firstname, lastname, department, white, brown, wholewheat } = req.body

    const employeeCodePattern = /^PHC\d*$/

    const dangerousPattern = /[<>\/\\\|:"'*?;@!#%^&().,=+`~$]/g

    if (empNumber.length <= 4) {
        return res.status(400).send('Your employee number is too short')
    } else if (!employeeCodePattern.test(empNumber)) {
        return res.status(400).send('Your employee number is invalid')
    }

    if (dangerousPattern.test(firstname) || dangerousPattern.test(lastname) || dangerousPattern.test(empNumber)) {
        return res.status(400).send('Your input has invalid characters')
    }

    if (white == 0 && brown == 0 && wholewheat == 0) {
        return res.status(400).send('You have not ordered any bread all loaves are 0')
    } else if (white > 15 || brown > 15 || wholewheat > 15) {
        return res.status(400).send('Your bread quantities are too high, 10 loaves is the maximum for each')
    }

    const date = new Date()

    const total = Number(white) + Number(brown) + Number(wholewheat)

    connect.query('INSERT INTO bread (employee_number, firstname, lastname, department, white, brown, wholewheat, total_loaves, date) VALUES (?,?,?,?,?,?,?,?,?)', [empNumber, firstname, lastname, department, white, brown, wholewheat, total, date], (error, results) => {
        if (error) {
            res.status(500).send('Error sending order');
            return;
        }
        // console.log(results[0]);
        res.send(results)
    })

    // connect.query('SELECT (b.total_loaves * p.unit_price) AS total_price FROM bread b JOIN bread_prices p ON b.', (error, results) => {
    connect.query('SELECT (b.white + b.brown + b.wholewheat) * p.unit_price AS total_price FROM bread b CROSS JOIN (SELECT unit_price FROM bread_pricing LIMIT 1) p ORDER BY id DESC LIMIT 1', (error, results) => {
        if (error) {
            res.status(500).send('Error calculating bread price');
            return;
        }
        const totalCost = results[0].total_price
        // console.log(totalCost)

        connect.query('UPDATE bread SET total_price = ? ORDER BY id DESC LIMIT 1 ', [totalCost], (error) => {
            if (error) {
                res.status(500).send('Error updating bread price');
                return;
            }
        })
    })
})

router.get('/price',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem ') }

    connect.query('SELECT * FROM bread_pricing', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching bread price');
            return;
        }
        res.send(results);
        // console.log('first')
    })
})

router.put('/price/change',sessionVerification, async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem ') }

    const { breadPrice } = req.body

    connect.query('UPDATE bread_pricing SET unit_price = ? ', [breadPrice], (error, results) => {
        if (error) {
            res.status(500).send('Error updating bread price');
            return;
        }
        res.send(results);
    })
})

router.get('/all', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    connect.query('SELECT * FROM bread', (error, results) => {
        if (error) {
            res.status(500).send('Error fetching bread orders');
            return;
        }
        res.send(results);
    })
})

router.get('/week', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const diffToMonday = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - diffToMonday);
    startOfWeek.setHours(8, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 3);
    endOfWeek.setHours(16, 0, 0, 0);

    connect.query('SELECT b.employee_number AS "EMPLOYEE CODE" ,b.firstname AS "FIRST NAME", b.lastname AS "LAST NAME", b.department AS "DEPARTMENT", SUM(b.white) AS "WHITE", SUM(b.brown) AS "BROWN", SUM(b.wholewheat) AS "WHOLE WHEAT", SUM(b.total_loaves) AS "TOTAL LOAVES", bp.unit_price AS "UNIT PRICE($)", SUM(b.total_price) AS "TOTAL AMOUNT($)" FROM bread b CROSS JOIN bread_pricing bp WHERE DATE(b.date) BETWEEN ? AND ? GROUP BY b.employee_number ,b.firstname, b.lastname, bp.unit_price', [startOfWeek, endOfWeek], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching this weeks orders');
            return;
        }
        res.send(results);

        const worksheet = xlsx.utils.json_to_sheet(results);

        // Create a new workbook and append the worksheet
        const workbook = xlsx.utils.book_new();

        const cleanStartOfWeek = new Date(startOfWeek).toLocaleDateString('en-GB', fileOptions)
        const cleanEndOfWeek = new Date(endOfWeek).toLocaleDateString('en-GB', fileOptions)

        xlsx.utils.book_append_sheet(workbook, worksheet, `${cleanStartOfWeek} - ${cleanEndOfWeek}`);


        // Define the file path
        const filePath = path.join('C:/Users/Administrator/Downloads', `Bread Orders Week Starting ${new Date(startOfWeek).toLocaleDateString('en-GB', options)}.xlsx`);
        console.log(`Bread orders output for ${cleanStartOfWeek} to ${cleanEndOfWeek}`)

        // Write the workbook to a file
        xlsx.writeFile(workbook, filePath);


        // printing 
        // const printCommand = `powershell -Command "Start-Process '${filePath}' -Verb Print"`;

        // exec(printCommand, (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`Error printing file: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         console.error(`Standard error output: ${stderr}`);
        //         return;
        //     }
        //     console.log('File sent to printer successfully:', stdout);
        // });

    })
})

router.get('/month', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate start date (20th of the current month)
    // let startOfRange = new Date(currentYear, currentMonth, 20);
    let startOfRange = new Date(currentYear, currentMonth, 1);
    startOfRange.setHours(0, 0, 0, 0); // Set time to midnight

    // Calculate end date (19th of the next month)
    let endOfRange;
    if (currentMonth === 11) { // If current month is December
        endOfRange = new Date(currentYear + 1, 0, 19); // Move to January of the next year
    } else {
        endOfRange = new Date(currentYear, currentMonth + 1, 19); // Move to the 19th of next month
    }
    endOfRange.setHours(23, 59, 59, 999);

    // console.log(new Date(startOfRange).toLocaleDateString('en-GB', options))
    // console.log(new Date(endOfRange).toLocaleDateString('en-GB', options))

    connect.query('SELECT employee_number AS "EMPLOYEE CODE" ,firstname AS "FIRST NAME", lastname AS "LAST NAME", SUM(total_loaves) AS "TOTAL LOAVES", SUM(total_price) AS "DEDUCTION ($)" FROM bread WHERE DATE(date) BETWEEN ? AND ? GROUP BY employee_number ,firstname, lastname', [startOfRange, endOfRange], (error, results) => {
        if (!req) { return res.status(400).send('There has been a problem') }

        if (error) {
            res.status(500).send('Error generating monthly report');
            return;
        }
        res.send(results);

        const worksheet = xlsx.utils.json_to_sheet(results);

        // Create a new workbook and append the worksheet
        const workbook = xlsx.utils.book_new();

        const cleanStartOfRange = new Date(startOfRange).toLocaleDateString('en-GB', fileOptions)
        const cleanEndOfRange = new Date(endOfRange).toLocaleDateString('en-GB', fileOptions)

        xlsx.utils.book_append_sheet(workbook, worksheet, `${cleanStartOfRange} - ${cleanEndOfRange}`);


        // Define the file path
        const filePath = path.join('C:/Users/Administrator/Downloads', `Bread Orders for ${new Date(cleanEndOfRange).toLocaleDateString('en-GB', monthFileOptions)} payroll.xlsx`);
        console.log(`Bread orders output for ${cleanStartOfRange} to ${cleanEndOfRange}`)

        // Write the workbook to a file
        xlsx.writeFile(workbook, filePath);

    })
})

// cron.schedule('40 15 * * 4', async () => {
cron.schedule('47 11 * * 1', async () => {
    try {
        // const response = await axios.get('http://localhost:8888/bread/week');
        const response = await axios.get('http://localhost:8888/bread/month');
        // console.log('Bread Orders Exported');
    } catch (error) {
        console.error('Error executing the task:', error);
    }
});

module.exports = router