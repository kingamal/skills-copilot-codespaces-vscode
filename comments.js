// Create we server
// 1. Load express
// 2. Load body-parser
// 3. Create express app
// 4. Load the comments data
// 5. Create an endpoint to get all comments
// 6. Create an endpoint to add a new comment
// 7. Create an endpoint to delete a comment
// 8. Start the server

// 1. Load express
const express = require('express');

// 2. Load body-parser
const bodyParser = require('body-parser');

// 3. Create express app
const app = express();

// 4. Load the comments data
const comments = require('./data/comments');

// 5. Create an endpoint to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// 6. Create an endpoint to add a new comment
app.post('/comments', bodyParser.json(), (req, res) => {
    const newComment = req.body;
    newComment.id = comments.length + 1;
    comments.push(newComment);
    res.json(newComment);
});

// 7. Create an endpoint to delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index > -1) {
        comments.splice(index, 1);
    }
    res.json({ message: 'Comment deleted' });
});

// 8. Start the server
app.listen(3000, () => {
    console.log('Server started');
});