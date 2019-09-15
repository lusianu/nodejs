const Usuario = require('./models/Usuarios')

// Usuario.create({
//     nome:"Luciano2",
//     sobrenome:"januario",
//     idade:33,
//     email:"luciano@uol.com"
// }).then(function(){
//     console.log('Foi')
// }).catch(function(erro){
//     console.log('Erro: '+erro)
// })

function buscaUsuarios(){
    return new Promise((resolve, reject) =>{
        Usuario.findAll().then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

function buscaNomeUsuarios(nome){
    return new Promise((resolve, reject) =>{
        Usuario.findAll({
            attributes: ['nome'],
            where: {nome : nome}
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}


function buscaUsuario(id){
    return new Promise((resolve, reject) =>{
        Usuario.findOne({
            where: {id : id}
        }).then(res =>{
            resolve(res)
        }).catch(err =>{
            reject(err)
        })
    })
}

function atualizaUsuario(id, nome, email, idade){
    return new Promise((resolve, reject) =>{
        Usuario.update(
            { nome: nome, email: email, idade:idade },
            { returning: true, where: { id: id } }
        )    
    }).then(res =>{
        resolve(res)
    }).catch(err =>{
        reject(err)
    })
}

function apagarUsuario(id){
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

// buscaUsuarios().then(data =>{
//     console.log(data)
// }).catch( err =>{
//     console.log(`Erro na busca de usuario : ${err};`)
// })


// buscaUsuario(3).then(data =>{
//     console.log(data)
// }).catch( err =>{
//     console.log(`Erro na busca de usuario : ${err};`)
// })

// buscaNomeUsuarios('luciano2').then(data =>{
//     console.log(data)
// }).catch( err =>{
//     console.log(`Erro na busca de usuario : ${err};`)
// })

// atualizaUsuario(3,'Daniela', 'dani@uol.com', 54).then(data =>{
//     console.log(data)
// }).catch( err =>{
//     console.log(`Erro na busca de usuario : ${err};`)
// })

apagarUsuario(1)