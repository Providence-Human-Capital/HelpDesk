const express = require('express')
const router = express.Router()
const connect = require('../database')
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const cron = require('node-cron');
const axios = require('axios')
const { exec } = require('child_process');

router.post('/add', async (req, res) => {
    if (!req) { return res.status(400).send('There has been a problem') }

    const { name, department, white, brown, wholewheat } = req.body

    if (white > 10 || brown > 10 || wholewheat > 10) {
        return res.status(500).send('Your bread quantities are too high, 10 loaves is the maximum for each')
    }

    const date = new Date()

    connect.query('INSERT INTO bread (fullname, department, white, brown, wholewheat, date) VALUES (?,?,?,?,?,?)', [name, department, white, brown, wholewheat, date], (error, results) => {
        if (error) {
            res.status(500).send('Error sending order');
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

    connect.query('SELECT * FROM bread WHERE DATE(date) BETWEEN ? AND ?', [startOfWeek, endOfWeek], (error, results) => {
        if (error) {
            res.status(500).send('Error fetching this weeks orders');
            return;
        }
        res.send(results);

        const worksheet = xlsx.utils.json_to_sheet(results);

        // Create a new workbook and append the worksheet
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Bread Orders');

        // Define the file path
        const filePath = path.join('C:/Users/Administrator/Downloads', `BreadOrders.xlsx`);

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

cron.schedule('40 15 * * 4', async () => {
    try {
        const response = await axios.get('http://localhost:8888/bread/week');
        console.log('Bread Orders Exported');
    } catch (error) {
        console.error('Error executing the task:', error);
    }
});

module.exports = router