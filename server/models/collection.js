const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  userId: {
    type: String,
    required: true  
  },
  name: {
    type: String,
    default: ''
  },
  numberOfQuestion: {
    type: Number,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Collection', collectionSchema);
