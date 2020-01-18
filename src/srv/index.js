require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(router);
app.use(express.static(path.join(__dirname,"public")));

app.listen(process.env.SPORT, () =>{
	console.log(`server running on port ${process.env.SPORT}`)
});
import path from 'path';