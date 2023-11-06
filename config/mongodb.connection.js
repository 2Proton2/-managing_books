const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const DB_NAME = `book_management`;

/**
 * Handshake with @DB_NAME DB
 */
mongoose.connect(`${DB_URL}${DB_NAME}`)
.then(() => {
    console.log(`Handshake with ${DB_NAME} database done successfully`);
})
.catch((err) => {
    console.log(`Database is upset. Here is the error message : ${err}`);
});