const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionConnectSchema = new Schema({
  questionId: {
    type: String,
    default: ''
  },
  collectionId:{
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('CollectionConnect', collectionConnectSchema);
