const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//require('./controller/controller')(app);

<<<<<<< HEAD
consign().include('./src/controller')
         .then('./src/modules')
         .then('./src/database/mysql.js')
=======
consign().include('./controller')
         .then('./modules')
>>>>>>> a758eea25502c65fda46fe83e3c3f11e2dc36b56
         .into(app);

app.listen(3000);

module.exports = app;

