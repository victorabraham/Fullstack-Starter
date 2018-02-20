require('dotenv').config();
var path = require('path');
var express = require('express');
const cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(cors());
app.options('*', cors());

var staticPath = path.join(__dirname, '/public');
app.use(express.static(staticPath));

app.get('/test', function (req, res) {
    res.send({test: 'test'});
});

app.listen(9000, function () {
    console.log('listening');
});