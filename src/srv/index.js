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

app.use(function (req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'false');
	next();
});

app.listen(process.env.SPORT, () =>{
	console.log(`server running on port ${process.env.SPORT}`)
});
