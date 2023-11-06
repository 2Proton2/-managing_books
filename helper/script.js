const bookSchema = require('../models/books.model');


/**
 * car data insertion
 */
async function dataInsertion(){
    try{
        for(let i = 4; i <= 20; i++){

            let obj = {
                "title": `title ${i}`,
                "author": `author ${i}`,
                "summary": `summary ${i}`
            };

            let bookInstance = new bookSchema(obj);
            await bookInstance.save();
            $logger_service.info("Added Book Succefully", i)
        }
    }
    catch(err){
        $logger_service.console.error(err);
    }
}

module.exports = {dataInsertion};

