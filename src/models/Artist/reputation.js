const mongoose = require('mongoose');

const ReputationSchema = new mongoose.Schema({
  evaluation: {
    type: String,
    default: ''
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  music: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Music'
  },
});

module.exports =  mongoose.model('Reputation', ReputationSchema);
