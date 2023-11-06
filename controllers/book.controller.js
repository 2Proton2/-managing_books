const $book_db_service = require('../models/books.model');
const $logger_service = require('../config/logger.config');

async function addBook(req, res){
    try{
        const book_instance = req.body;
        if(book_instance){
            const book_instance_document = new $book_db_service(book_instance);
            let result = await book_instance_document.save();
            $logger_service.info(result)
            res.status(201).json({
                message: 'Book added successfully in the database',
                instance: result
            })
        }
        else{
            throw new Error(`Enter valid Details`);
        }
    }
    catch(err){
        $logger_service.error(err)
        if(err == `Enter valid Details`){
            res.status(400).send({
                message: `${err}`
            })
        }
        res.status(422).send({
            message: `${err}`
        })
    }
}

async function findSpecificBook(req, res){
    try{
        const book_id = req.params.id;
        const entry = await $book_db_service.findById(book_id);
        if(entry){
            res.status(200).json({"instance": entry})
        }
        else{
            throw new Error(`Book doesn't exist`);
        }
    }
    catch(err){
        $logger_service.error(err)
        if(err == `Book doesn't exist`){
            res.status(204).send({
                message: `${err}`
            })
        }
        res.status(422).send({
            message: `${err}`
        })
    }
}

async function findAllBook(req, res){
    try{
        let entries = await $book_db_service.find({});
        if(entries){
            res.status(200).json({
                instance: entries
            });
        }
        else{
            throw new Error("No books available at present")
        }
    }
    catch(err){
        $logger_service.error(err)
        res.status(422).send({
            message: `${err}`
        });
    }
}

async function updateOneBook(req, res){
    try{
        const book_id = req.params.id
        const field = req.body.field;
        const value = req.body.value;

        let result = await $book_db_service.findByIdAndUpdate(
            book_id,
            { [field]: value },
            { new: true }
        );
        if(result){
            $logger_service.info(result)
            res.status(200).json({
                instance: result
            });
        }
        else{
            throw new Error(`Book doesn't exist`);
        }
    }
    catch(err){
        $logger_service.error(err)
        if(err == `Book doesn't exist`){
            res.status(204).send({
                message: `${err}`
            })
        }
        res.status(422).send({
            message: `${err}`
        })
    }
}

async function deleteOneBook(req, res){
    try{
        const book_id = req.params.id

        let entryToBeDeleted = await $book_db_service.findById(book_id);

        if(entryToBeDeleted){
            let deletedInstanceResult = await entryToBeDeleted.deleteOne(); 
            res.status(204).json({
                instance: deletedInstanceResult
            });
        }
        else{
            throw new Error(`Book doesn't exist`);
        }
    }
    catch(err){
        $logger_service.error(err)
        if(err == `Book doesn't exist`){
            res.status(204).send({
                message: `${err}`
            })
        }
        res.status(422).send({
            message: `${err}`
        });
    }
}

module.exports = {
    addBook,
    findSpecificBook,
    findAllBook,
    updateOneBook,
    deleteOneBook
};