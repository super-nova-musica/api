const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"
  },
  tags: [String],
});


MusicSchema.pre("save",async function(next) {
  if(process.env.STORAGE_TYPE == 'cloud') {
  console.log('ok')

      this.link = `${process.env.STORAGE_URL}${this.link}`
      next()
  } else {
    this.link = `http://localhost:${process.env.PORT}/files/${this.link}`


    next()
  }
});


module.exports =  mongoose.model('Music', MusicSchema);
