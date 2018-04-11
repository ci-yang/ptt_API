const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var fs = require('fs');
var accountObj = require('./account.json');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}
app.all('/*', setupCORS);


const host = accountObj.account.host;
const user = accountObj.account.user;
const password = accountObj.account.pwd;
const database = 'ptt';
const account = [host,user,password,database];

require('./routes')(app, account);
app.listen(port,() => {
	console.log('We are live on ' + port);
});