const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  scripname: {
    type: String,
    required: true
  },
  cmp: {
    type: Number,
    required: true
  },
  entry: {
    type: Number,
    required: true
  },
  stoploss: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    required: true
  }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
