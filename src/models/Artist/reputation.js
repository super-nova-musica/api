import mongoose from 'mongoose';

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

export default mongoose.model('Reputation', ReputationSchema);
