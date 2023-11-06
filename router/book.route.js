const $database_service = require('../config/mongodb.connection');
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller')

router.post('/add-book', bookController.addBook);
router.get('/getAll', bookController.findAllBook);
router.get('/get/:id', bookController.findSpecificBook);
router.patch('/update/:id', bookController.updateOneBook);
router.delete('/delete/:id', bookController.deleteOneBook)

module.exports = router;