import mongoose from 'mongoose';

const { DB_URL ,DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT, DB_TYPE } = process.env;

if (DB_TYPE == 'cloud') {
    const connection = mongoose.connect(DB_URL, 
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )

  mongoose.connection.on('err', () => console.error(`> Connection error ${DB_TYPE}`))
  mongoose.connection.once('open', () => console.log(`> Database connected ${DB_TYPE}`))

  return connection

} else {
  const connection = mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )

  mongoose.connection.on('err', () => console.error(`> Connection error ${DB_TYPE}`))
  mongoose.connection.once('open', () => console.log(`> Database connected ${DB_TYPE}`))

  return connection
}



export default connection