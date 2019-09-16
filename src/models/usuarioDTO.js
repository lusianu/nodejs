const Usuario = require('./Usuarios');

module.exports = {

novoUsuario:    function novoUsuario(body){
                    return new Promise((resolve, reject) =>{
                        Usuario.create({
                            nome:  body.nome,
                            email: body.email,
                            senha: body.senha
                        }).then(res =>{
                            resolve(res)
                        }).catch(err =>{
                            reject(err)
                        })
                    })
                },

buscaUsuarios:  function buscaUsuarios(){
                    return new Promise((resolve, reject) =>{
                        Usuario.findAll().then(res =>{
                            resolve(res)
                        }).catch(err =>{
                            reject(err)
                        })
                    })
                },

buscaUsuarioPorEmail:  function buscaUsuarioPorEmail(email){
                        return new Promise((resolve, reject) =>{
                            Usuario.findOne({
                                //attributes: ['nome'],
                                where: {email : email}
                            }).then(res =>{
                                resolve(res)
                            }).catch(err =>{
                                reject(err)
                            })
                        })
                    },


buscaUsuario:   function buscaUsuario(id){
                    return new Promise((resolve, reject) =>{
                        Usuario.findOne({
                            where: {id : id}
                        }).then(res =>{
                            resolve(res)
                        }).catch(err =>{
                            reject(err)
                        })
                    })
                },

atualizaUsuario:function atualizaUsuario(body){
                    return new Promise((resolve, reject) =>{
                        Usuario.update(
                            { nome: body.nome, email: body.email, idade: body.idade },
                            { returning: true, where: { id: body.id } }
                        )    
                    }).then(res =>{
                        resolve(res)
                    }).catch(err =>{
                        reject(err)
                    })
                },

apagarUsuario:  function apagarUsuario(id){
                    Usuario.destroy({
                        where: {
                        id: id
                        }
                    }).then(function(rowDeleted){ 
                    if(rowDeleted === 1){
                        console.log('Deleted successfully '+rowDeleted);
                        }
                    }, function(err){
                        console.log(err); 
                    });
                }

}
