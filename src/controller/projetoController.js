const express = require('express');

const authMiddleware = require('./middlerwares/autenticacao');

const router = express.Router();

router.use(authMiddleware); 

router.get('/', async(req, res) => {
    
    try {
        await mysql.connect();
        
        mysql.query('SELECT * FROM usuario', function (error, results) {
        if (error){
            res.status(400).send({erro:error});
        }
        res.send({usuario:results});
        }); 
    } catch (err) {
        console.error('erro', err);
    }
    
});

module.exports = app => app.use('/projeto', router);