/**
 * Module to add and update documents in the databases
 */

// Model that makes the connection with the mongoDB database
var alunos = require('../models/alunos.js')
var docentes = require('../models/docentes.js')
var tecnicos = require('../models/tecnicos.js')

// Controller that provides functionality to connect with the algolia database
// var Algolia = require('./algolia.js')

/**
 * Retrieve all students from the BD
 * RETRIEVE
 * @returns The students or an error
 */
module.exports.listAlunos = () => {
  return alunos
          .find() // No filters
          .then(resp => {
            return resp
          })
          .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
          })
}

/**
 * Retrieve a student from the BD given its id
 * RETRIEVE
 * @param {*} id - the id of the student
 * @returns The student or an error
 */
module.exports.getAluno = id => {
  return alunos
          .find({_id: id})
          .then(resp => {
            return resp
          })
          .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
          })
}

/**
 * Retrieve all teachers from the BD
 * RETRIEVE
 * @returns The teachers or an error
 */
module.exports.listDocentes = () => {
    return alunos
        .find() // No filters
        .then(resp => {
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Retrieve a teacher from the BD given its id
 * RETRIEVE
 * @param {*} id - the id of the teacher
 * @returns The teacher or an error
 */
module.exports.getDocente = id => {
    return docentes
        .find({_id: id})
        .then(resp => {
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Retrieve all technicians from the BD
 * RETRIEVE
 * @returns The technicians or an error
 */
module.exports.listTecnicos = () => {
    return tecnicos
        .find() // No filters
        .then(resp => {
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}



/**
 * Retrieve a technician from the BD given its id
 * RETRIEVE
 * @param {*} id - the id of the technician
 * @returns The technician or an error
 */
module.exports.getTecnico = id => {
    return tecnicos
        .find({_id: id})
        .then(resp => {
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Get the next id to be used in the database for a student
 * @returns the next id to be used
 */
module.exports.getCurrentIdAluno = () => {
  return alunos
          .find({}, {_id: 1})
          .sort({_id: -1}) // Sort descending
          .limit(1) // Only the maximum
          .then(resp => {
            // If there are no students in the database, start in 0
            if (resp.length === 0){
              return {_id: 0}
            }
            else{
              // Else return the maximum id +1
              return {_id: resp[0]._id+1}
            }
          })
          .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
          })
}

/**
 * Get the next id to be used in the database for a teacher
 * @returns the next id to be used
 */
module.exports.getCurrentIdDocente = () => {
    return docentes
        .find({}, {_id: 1})
        .sort({_id: -1}) // Sort descending
        .limit(1) // Only the maximum
        .then(resp => {
            // If there are no teachers in the database, start in 0
            if (resp.length === 0){
                return {_id: 0}
            }
            else{
                // Else return the maximum id +1
                return {_id: resp[0]._id+1}
            }
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Get the next id to be used in the database for a technician
 * @returns the next id to be used
 */

module.exports.getCurrentIdTecnico = () => {
    return tecnicos
        .find({}, {_id: 1})
        .sort({_id: -1}) // Sort descending
        .limit(1) // Only the maximum
        .then(resp => {
            // If there are no technicians in the database, start in 0
            if (resp.length === 0) {
                return {_id: 0}
            } else {
                // Else return the maximum id +1
                return {_id: resp[0]._id + 1}
            }
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Add a student to the database
 * CREATE
 * @param {*} aluno - the student to be added
 * @returns The student added or an error
 */

module.exports.addAluno = aluno => {
    return alunos
        .create(aluno)
        .then(resp => {
            // Algolia.add(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Add a teacher to the database
 * CREATE
 * @param {*} docente - the teacher to be added
 * @returns The teacher added or an error
 */

module.exports.addDocente = docente => {
    return docentes
        .create(docente)
        .then(resp => {
            // Algolia.add(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Add a technician to the database
 * CREATE
 * @param {*} tecnico - the technician to be added
 * @returns The technician added or an error
 */

module.exports.addTecnico = tecnico => {
    return tecnicos
        .create(tecnico)
        .then(resp => {
            // Algolia.add(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Update a student in the database
 * UPDATE
 * @param {*} aluno - the student to be updated
 * @param {*} id - the id of the student to be updated
 * @returns The student updated or an error
 */

module.exports.updateAluno = (aluno, id) => {
    return alunos
        .updateOne({_id: id}, aluno)
        .then(resp => {
            // Algolia.update(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Update a teacher in the database
 * UPDATE
 * @param {*} docente - the teacher to be updated
 * @param {*} id - the id of the teacher to be updated
 * @returns The teacher updated or an error
 */

module.exports.updateDocente = (docente, id) => {
    return docentes
        .updateOne({_id: id}, docente)
        .then(resp => {
            // Algolia.update(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Update a technician in the database
 * UPDATE
 * @param {*} tecnico - the technician to be updated
 * @param {*} id - the id of the technician to be updated
 * @returns The technician updated or an error
 */

module.exports.updateTecnico = (tecnico, id) => {
    return tecnicos
        .updateOne({_id: id}, tecnico)
        .then(resp => {
            // Algolia.update(resp)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Remove a student from the database
 * DELETE
 * @param {*} id - the id of the student to be removed
 * @returns The student removed or an error
 */

module.exports.deleteAluno = id => {
    return alunos
        .deleteOne({_id: id})
        .then(resp => {
            // Algolia.remove(id)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Remove a teacher from the database
 * DELETE
 * @param {*} id - the id of the teacher to be removed
 * @returns The teacher removed or an error
 */

module.exports.deleteDocente = id => {
    return docentes
        .deleteOne({_id: id})
        .then(resp => {
            // Algolia.remove(id)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}

/**
 * Remove a technician from the database
 * DELETE
 * @param {*} id - the id of the technician to be removed
 * @returns The technician removed or an error
 */

module.exports.deleteTecnico = id => {
    return tecnicos
        .deleteOne({_id: id})
        .then(resp => {
            // Algolia.remove(id)
            return resp
        })
        .catch(error => {
            console.log("Controller mongoDB: " + error)
            return error
        })
}