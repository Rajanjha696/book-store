const app = require('express')();
const bodyparser = require('body-parser');

const db = require('./db/db');
const morgan = require('morgan')
app.use(morgan('dev'));

const books=require('./routes/books')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.send({message:"Rest APIs for Book store are up and running!!"});
});

app.use('/api',books)

app.listen(process.env.PORT || 4000, () => {
    console.log('App listening on port 4000');
});