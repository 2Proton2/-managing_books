const express = require('express');
const app = express();
const body_parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

/**
 * database config
 */
require('./config/mongodb.connection');

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
app.listen(PORT, () => {
    console.log(`Serving listening at port ${PORT}`);
})