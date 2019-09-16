const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const autConfig = require('../config/autenticacao.json');
const crypto = require('crypto');
const mailer = require('../modules/meiler');
const usuario = require('../models/usuarioDTO');

async function gerarHashSenha(senha){
    return bcrypt.hash(senha, 10);
}

const router = express.Router();

function gerarToken(params = {}){
    return jwt.sign({id:params}, autConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/registro', async(req, res) =>{          
    const usuarioRetorno = await usuario.buscaUsuarioPorEmail(req.body.email);

    if(!usuarioRetorno){
        req.body.senha = await gerarHashSenha(req.body.senha)
        await usuario.novoUsuario(req.body).then(data =>{
            res.send({Usuario: data, token:gerarToken({id:data.id})})
            }).catch( err =>{
                res.status(400).send({erro: err});
            })
        
    } else {
        res.status(400).send({erro:'o usuário '+req.body.email+' já existe'});
    } 
});

router.post('/autenticacao', async(req, res) =>{
    const{email, senha} = req.body;
    await usuario.buscaUsuarioPorEmail(email).then(data =>{
        console.log("luciano 23 "+data)
            if(!data)
                return res.status(400).send({erro : 'usuário não econtrado'});

            bcrypt.compare(senha, data.senha).then(confere);
            console.log("luciano 22 "+confere)
            if(!confere)        
                return res.status(400).send({erro : 'Senha não confere'});
            
            res.send({
                data, 
                token:gerarToken({id:data.id})
            });
    }).catch( err =>{
        return res.status(400).send({erro : err});
    })
});

router.post('/esqueci_minha_senha', async(req, res) =>{
    const { email} = req.body;
    try{
        const user = await usuario.findOne({email});

        if(!user)
            return res.status(400).send({erro : 'usuário não econtrado'});

        const token = crypto.randomBytes(20).toString('hex');
        
        const now = new Date();
        now.setHours(now.getHours()+1);

        await usuario.findByIdAndUpdate(user.id,{
            '$set':{
                passwordResetToken : token,
                passwordResetExpires :now
            }
        }); 

        console.log(token, now); 

        const mailOptions = {
            to:email,
            from:"luciano@gmail.com",
            subject:"Teste",
            //watchHtml :'esqueciMinhaSenha',
            //html: './resources/mail/auth/esqueciMinhaSenha',
            html: "<p>Você esqueceu sua senha, não tem problema, utilize o token :{{token}}</p>",
            text: {token}
        };
        await mailer.sendMail(mailOptions, (err, info) => {
            if (err)
                return res.status(400).send({erro : err});
            
            return res.send(info);  
        });

//         await mailer.sendMail({
//             to:email,
//             from:"luciano@gmail.com",
//             subject:"Teste",
//             //watchHtml :'esqueciMinhaSenha',
//             //html: './resources/mail/auth/esqueciMinhaSenha',
//             html: "<p>Você esqueceu sua senha, não tem problema, utilize o token :{{token}}</p>",
//             text: {token}
//         }, (erro) => {
//             if(erro)
//                 return res.status(400).send({erro : erro});

//             return res.send();                
//         })
    }catch(erro){
        console.log(erro);
        res.status(400).send({erro:'Ou aqui'})
    }

});

module.exports = app => app.use('/auth', router);