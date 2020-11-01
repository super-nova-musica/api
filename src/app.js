require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
// import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
// import swagger from 'swagger-ui-express';

import routes from './routes';
import upload_config from './config/upload';
import './config/database';
import model from './models';
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

export default app;
