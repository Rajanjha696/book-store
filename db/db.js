var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://Kashyap:Kashyap123@cluster0.8gffr.mongodb.net/book_store?retryWrites=true&w=majority';
mongoose.connect(mongoDB || "mongodb://127.0.0.1/book_store", { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log("Connected to db book store APP......!!!");
});

module.exports = db;