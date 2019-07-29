const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controller/controller')(app);

consign().include('./controller')
         .then('./modules')
         .into(app);

app.listen(3000);

module.exports = app;

