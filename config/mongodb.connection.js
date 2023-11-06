const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const DB_NAME = `book_management`;
const $logger_service = require('../config/logger.config');

/**
 * Handshake with @DB_NAME DB
 */
mongoose.connect(`${DB_URL}${DB_NAME}`)
.then(() => {
    $logger_service.info(`Handshake with ${DB_NAME} database done successfully`);
})
.catch((err) => {
    $logger_service.error(`Database is upset. Here is the error message : ${err}`)
});