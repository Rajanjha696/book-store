const router = require('express').Router();
const dbServices = require('../models/models');
const booksServices = dbServices.books;
const httpStatus = require('http-status');
const constants = require('../utils/constants')

router.get('/books', async (req, res) => {
    let offset;
    let limit;
    if (req.query.pageNo && req.query.perPage) {
        req.query.perPage = parseInt(req.query.perPage);
        req.query.pageNo = parseInt(req.query.pageNo);
        offset = req.query.perPage * (req.query.pageNo - 1);
        limit = req.query.perPage;
    } else {
        offset = 0;
        limit = 20;
    }
    try {
        const books = await booksServices.find()
            .skip(offset)
            .limit(limit)

        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: books });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, data: null });
    }

});

router.post('/books', async (req, res) => {

    let newBook = new booksServices(req.body);
    try {
        const book = await newBook.save();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: book });
    } catch (exception) {
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, exception: exception });
    }
});

router.delete('/books', async (req, res) => {
    try {
        booksServices.find({ name: req.body.name }).deleteOne().exec();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: null });
    } catch (exception) {
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, exception: exception });
    }
});

router.put('/books', async (req, res) => {
    try {
        booksServices.findOneAndUpdate({ 'name': req.body.name }, req.body).exec();
        res.status(200).json({ status: httpStatus.OK, message: constants.SUCCCESS_MSG, data: null });
    } catch (exception) {
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: constants.FAILURE_MSG, exception: exception });
    }
});


module.exports = router;