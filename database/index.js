const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
// mongoose.connect('mongodb://localhost/massdrop');
mongoose.connect('mongodb://massdropchallenge:Temporary11@ds127044.mlab.com:27044/massdropchallenge');
mongoose.Promise = require('bluebird');
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const urlSchema = mongoose.Schema({
    url: String,
    html: String,
    status: String
  });

urlSchema.plugin(findOrCreate);

const historyStorage = mongoose.model('historyStorage', urlSchema);

module.exports = historyStorage;
