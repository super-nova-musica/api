if(process.env.ENV == 'dev') {
  require('dotenv').config({silent: true})
}

const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require 'morgan';
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const swagger = require 'swagger-ui-express';

const routes = require('./routes');
const upload_config = require('./config/upload');
require( './config/database')();
const model = require('./models');
// import swagger_file from './swagger_output.json';

const app = express();
const upload = multer(upload_config);

app.upload = upload
app.model = model

// console.log(process.env.DB_NAME);

app.use(express.json());
app.use(bodyParser.json());
app.use('/files', express.static(path.resolve(__dirname, '..','tmp','uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use(cors());
// app.use('/doc', swagger.serve, swagger.setup(swagger_file))
 routes(app)
// require('./routes')(app)

module.exports = app;
