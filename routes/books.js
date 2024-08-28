'use strict';

const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get all books
router.get('/books', function (req, res, next) {
    connection.execute('SELECT * FROM books;')
        .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error get all books");
        });
});

// Get book by id
router.get('/books/:bid', function (req, res, next) {
    const bookId = req.params.bid;
    connection.execute('SELECT * FROM books WHERE id=?;', [bookId])
        .then((result) => {
            var data = result[0];
            if (data.length === 0) {
                res.sendStatus(404);
            } else {
                res.send(data[0]);
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error get the book.");
        });
});

// Create new book
router.post('/books', function (req, res, next) {
    connection.execute(`INSERT INTO books (title, author, published_year, genre, available) VALUES (?, ?, ?, ?, ?);`,
        [req.body.title, req.body.author, req.body.published_year, req.body.genre, req.body.available])
        .then(() => {
            console.log('Insert Successfully');
            res.status(201).send("Insert Successfully");
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error insert the book");
        });
});

// Update book
router.put('/books/:bid', function (req, res, next) {
    const { title, author, published_year, genre, available } = req.body;
    const bookId = req.params.bid;
    connection.execute("UPDATE books SET title=?, author=?, published_year=?, genre=?, available=? WHERE id=?;", 
        [title, author, published_year, genre, available, bookId])
        .then(() => {
            res.status(200).send("Update Successfully.");
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error update the book.");
        });
});

// Delete book
router.delete('/books/:bid', function (req, res, next) {
    const bookId = req.params.bid;
    connection.execute("DELETE FROM books WHERE id=?;", [bookId])
        .then(() => {
            res.status(200).send("Delete Successfully.");
        }).catch((err) => {
            console.error(err);
            res.status(500).send("Error delete the book.");
        });
});

// 404
router.use(function (req, res, next) {
    res.sendStatus(404);
});

module.exports = router;