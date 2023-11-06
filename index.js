const express = require('express');
const app = express();
const body_parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const $logger_service = require('./config/logger.config');

/**
 * database config
 */
const database = require('./config/mongodb.connection');

/**
 * use json as packet format
 * enable the body parser
 */
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended:true }))

/**
 * specifying the endpoints
 */
app.use('/book', require('./router/book.route'));

/**
 * Hey buddy! I am listenning at @PORT
 */
const server = app.listen(PORT, () => {
    $logger_service.info(`Serving listening at port ${PORT}`);
})

/**
 * close the database connection when terminating the program
 */
process.on('SIGINT', () => {
    server.close(() => {
        mongoose.connection.close()
        .then(() => {
            $logger_service.info(`connection closed`);
            process.exit(0);
        })
        .catch((err) => {
            $logger_service.error(`${err}`);
        });
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        mongoose.connection.close()
        .then(() => {
            $logger_service.info(`connection closed`);
            process.exit(0);
        })
        .catch((err) => {
            $logger_service.error(`${err}`);
        });
    });
});