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
    
    try {    
        const usuarioExistente = await usuario.buscaUsuarioPorEmail(req.body.email);

        if(!usuarioExistente){
            req.body.senha = await gerarHashSenha(req.body.senha);
            
            const usuarioRetorno = await usuario.novoUsuario(req.body);
            
            res.status(200).send({usuario: usuarioRetorno, token:gerarToken({id:usuarioRetorno.id})});
            
        } else {
            res.status(400).send({erro:'o usuário '+usuarioExistente.email+' já existe'});
        } 
    } catch (err){
        return res.status(400).send({erro : err});
    }
});

router.post('/autenticacao', async(req, res) =>{
    const{email, senha} = req.body;
    
    try {
        const usuarioRetorno = await usuario.buscaUsuarioPorEmail(email)
        
        if(!usuarioRetorno){
            return res.status(400).send({erro : 'usuário não econtrado'});
        } else {
            if(! await bcrypt.compare(senha, usuarioRetorno.senha)){
                return res.status(400).send({erro : 'Senha não confere'});
            } else { 
                res.status(200).send({usuarioRetorno, token:gerarToken({id:usuarioRetorno.id})});
            }
        }
    } catch (err){
        return res.status(400).send({erro : err});
    }
});

router.post('/esqueci_minha_senha', async(req, res) =>{
    const { email} = req.body;
    try {
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