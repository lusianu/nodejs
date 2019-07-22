const jwt = require('jsonwebtoken');
const autConfig = require('./config/autenticacao.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({erro : 'Token não informado'});

    const parts = authHeader.split(' ');    

    if(!parts.length === 2)
        return res.status(401).send({erro : 'Token informado de forma incorreta'});

    const[scheme, token] = parts;
    
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({erro : 'Token mal formatado'});

    jwt.verify(token, autConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({erro : 'Token inválido'});

        req.userId = decoded.id;
        return next();    
    });       
};