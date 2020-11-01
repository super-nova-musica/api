module.exports = function routes(app) {
  // app.post('/artist', async (req, res) => {
  //   try {
      
  //   }
  //   catch(err) {

  //   }
  // })
  app.post('/artist', async (req, res) => {
    try {
      const artist = await app.model.artist.create(req.body)

      res.json({ status: 'ok', artist })
    }
    catch(err) {
      res.json({ status: 'error', err })
    }
  });


  app.get('/artist', async (req, res) => {
    try {
      const result = await app.model.artist.find({})

      res.json({ status: 'ok', result })
    }
    catch(err) {
      res.json({ status: 'err', err})
    }
  });

  app.get('/artist/:id', async (req, res) => {
    try {
      const result = await app.model.artist.findOne({_id: req.params.id})

      res.json({ status: 'ok', result })
    }
    catch(err) {
      res.json({ status: 'err', err})
    }
  });

  app.post('/music', app.upload.single('music'), async (req, res) => {
    const { title, description, tags } = req.body
    const { music:link} = req.file
    const { user_id:artist } = req.headers
    try {
      const result = await app.model.music.create({
        artist,
        title,
        description,
        tags,
        link,
      })
      await app.model.artist.findByIdAndUpdate(artist, title,
       {new: true});
      res.json({status: 'ok', result})
    }
    catch(err) {
      res.json({ status: 'error', err})
    }
  });

  app.get('/music', async (req, res) => {
    try {
      const result = await app.model.music.find({}).populate('artist').exec()

      res.json({ status: 'ok', result})
    }
    catch(err) {
      res.json({ status: 'err', err })
    }
  });

  app.get('/music/:id', async (req, res) => {
    try {
      const result = await app.model.music.findOne({_id: req.params.id}).populate('artist').exec()

      res.json({ status: 'ok', result})
    }
    catch(err) {
      res.json({ status: 'err', err })
    }
  });


  app.post('/reputation', async (req, res) => {
    const { user_id: artist, music_id: music } = req.headers;
    const {evaluation} = req.body
     try {
        const result = await app.model.reputation.create(
          {
            artist,
            music,
            evaluation
          
          })

        res.json({ stautus: 'ok', result})
     }
     catch(err) {
       res.json({ status: 'err', err})
     }
    
  });

  app.get('/reputation', async (req, res) => {
      try {
        const result = await app.model.reputation.find({}).populate('artist').populate('music').exec()

        res.json({ status: 'ok', result})
      }
      catch(err) {
        res.json({ status: 'err', err })
      }
  });
}
