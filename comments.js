// Create web server
// 1. Load modules
// 2. Create web server
// 3. Listen to requests
// 4. Read file
// 5. Write file
// 6. Delete file
// 7. Update file
// 8. Add comment
// 9. Delete comment
// 10. Update comment

// 1. Load modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// 2. Create web server
const app = express();
const port = 3000;

// 3. Listen to requests
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// 4. Read file
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        res.json(JSON.parse(data));
    });
});

// 5. Write file
app.post('/comments', bodyParser.json(), (req, res) => {
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send('Error writing file');
            return;
        }

        res.send('File written');
    });
});

// 6. Delete file
app.delete('/comments', (req, res) => {
    fs.unlink(path.join(__dirname, 'comments.json'), (err) => {
        if (err) {
            res.status(500).send('Error deleting file');
            return;
        }

        res.send('File deleted');
    });
});

// 7. Update file
app.put('/comments', bodyParser.json(), (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }

        const comments = JSON.parse(data);
        comments.push(req.body);

        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('