var User = require('../models/user')

// Devolve a lista de Users
module.exports.list = () => {
    return User
        .find()
        .sort('name')
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


module.exports.getUser = id => {
    return User.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addUser = u => {
    return User.create(u)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateUser = (id, info) => {
    return User.updateOne({ _id: id }, { $set: info })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({ _id: id }, {password: pwd})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteUser = id => {
    return User.deleteOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.changePassword = (email, newPassword) => {
    return User.findOne({ email: email })
       .then(response => {
            if (!response) {
                return { error: "Email not in use" }
            } else {
                response.setPassword(newPassword, (err, user) => {
                if (err) {
                    console.log(err.message)
                  return err;
                } else {
                // Salve as alterações no utilizador
                    response.save()
                    .then(response => {
                        return response
                    })
                    .catch(err => {
                        console.log(err)
                        return err;
                    })
                }
              });
            
            }
        })   
       .catch(err => {
            return err;
       }) 

  };
  

