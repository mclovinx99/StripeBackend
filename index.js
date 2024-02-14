const express = require('express');
const db = require('./data/db');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
// const scheduler = require('./data/cron_job')


app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


const routes = require('./routes');
const path = require('path');

//define port
const port = 4242;


app.listen(process.env.PORT || port, () => {
	console.log("App listening on 4242");
});

//static directory
app.use(express.static(__dirname + '/uploads'));

//for logs
app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
})


app.use('/', routes);