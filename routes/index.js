var express = require('express');
var router = express.Router();

// Controller to the dbs
var users = require('../controllers/users.js')

var alunos = require('../models/alunos.js')
var docentes = require('../models/docentes.js')
var tecnicos = require('../models/tecnicos.js')

/**
 * GET all the students
 */
router.get('/users/alunos', function(req, res) {
  users.listAlunos()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(511).json({error: error, message: "Could not retreive the students list"}))
});

/**
 * GET student given the ID
 */
router.get('/users/alunos/:id', (req,res) => {
  users.getAluno(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(521).json({error: error, message: "Could not obtain the student"}))
})

/**
 * GET the current maximum ID for a student
 */
router.get('/users/currentIdAluno', (req, res) => {
  users.getCurrentIdAluno()
  .then(data => res.status(200).json(data))
  .catch(error => res.status(522).json({error: error, message: "Could not obtain the current id"}))
})

/**
 * GET all the teachers
 */
router.get('/users/docentes', function(req, res) {
  users.listDocentes()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(511).json({error: error, message: "Could not retreive the students list"}))
});

/**
 * GET teacher given the ID
 */
router.get('/users/docentes/:id', (req,res) => {
  users.getDocente(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(521).json({error: error, message: "Could not obtain the student"}))
})

/**
 * GET the current maximum ID for a teacher
 */
router.get('/users/currentIdDocente', (req, res) => {
  users.getCurrentIdDocente()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(522).json({error: error, message: "Could not obtain the current id"}))
})

/**
 * GET all the technicians
 */
router.get('/users/tecnicos', function(req, res) {
  users.listTecnicos()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(511).json({error: error, message: "Could not retreive the students list"}))
});

/**
 * GET teacher given the ID
 */
router.get('/users/tecnicos/:id', (req,res) => {
  users.getTecnico(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(521).json({error: error, message: "Could not obtain the student"}))
})

/**
 * GET the current maximum ID for a teacher
 */
router.get('/users/currentIdTecnicos', (req, res) => {
  users.getCurrentIdTecnico()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(522).json({error: error, message: "Could not obtain the current id"}))
})

/**
 * POST a student
 */
router.post('/users/alunos', (req,res) => {
  users.addAluno(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(526).json({error: error, message: "Could not insert the student"}))
})

/**
 * POST a teacher
 */
router.post('/users/docentes', (req,res) => {
  users.addDocente(req.body)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(526).json({error: error, message: "Could not insert the teacher"}))
})

/**
 * POST a technician
 */
router.post('/users/tecnicos', (req,res) => {
  users.addTecnico(req.body)
      .then(data => res.status(201).json(data))
      .catch(error => res.status(526).json({error: error, message: "Could not insert the technician"}))
})

/**
 * PUT a student
 */
router.put('/users/alunos/:id', (req,res) => {
  users.updateAluno(req.body, req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(527).json({error: error, message: "Could not update the technician"}))
})

/**
 * PUT a teacher
 */

router.put('/users/docentes/:id', (req,res) => {
  users.updateDocente(req.body, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(527).json({error: error, message: "Could not update the technician"}))
})

  /**
   * PUT a technician
   */

  router.put('/users/tecnicos/:id', (req,res) => {
    users.updateTecnico(req.body, req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(527).json({error: error, message: "Could not update the technician"}))
  })

/**
 * DELETE a student
 */

router.delete('/users/alunos/:id', (req,res) => {
  users.deleteAluno(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(528).json({error: error, message: "Could not delete the student"}))
})

/**
 * DELETE a teacher
 */

router.delete('/users/docentes/:id', (req,res) => {
  users.deleteDocente(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(528).json({error: error, message: "Could not delete the teacher"}))
})

/**
 * DELETE a technician
 */

router.delete('/users/tecnicos/:id', (req,res) => {
  users.deleteTecnico(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(528).json({error: error, message: "Could not delete the technician"}))
})

module.exports = router;