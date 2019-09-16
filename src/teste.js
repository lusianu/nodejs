const user = require('./models/usuarioDTO')


user.buscaUsuarios().then(data =>{
    console.log(data)
}).catch( err =>{
    console.log(`Erro na busca de usuario : ${err};`)
})


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

