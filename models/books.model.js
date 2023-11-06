const $database_service = require('../config/mongodb.connection');
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        default: 'Enter the book summary'
    }

}, {
    timestamps: true
});

const book = new mongoose.model('book', bookSchema);
module.exports = book;