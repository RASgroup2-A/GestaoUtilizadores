const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Controller to the dbs
const users = require('../controllers/users.js');
var usersModel = require('../models/users')
const auth = require('../../API/auth/auth');
const { hash } = require("bcrypt");

function paginatedResults(model) {
  return async (req, res, next) => {
    const queries = []
    const match = {
      $match: {}
    }
    queries.push(match)

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    try {
      res.paginatedResults = results;

      const aggregation = model.aggregate(queries);
      var total = await model.aggregate([...queries, { $count: 'count' }]).exec();
      total = total.length > 0 ? total[0].count : 0
      results.results = await aggregation.skip(startIndex).limit(limit).exec();

      if (endIndex < total) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error, message: error.message });
    }
  }
}

function verifyActiveStatus(req, res, next) {
  usersModel.findOne({ email: req.body.email })
    .then(response => {
      if (response.active === false) {
        res.status(501).jsonp({ error: "User is not active", message: "User is not active" })
      }
      else {
        next()
      }
    })
    .catch(err => {
      res.status(500).jsonp({ error: err, message: "Login error: " + err })
    })

}

/**
 * POST rota para registar um utilizador à base de dados
 */
router.post('/register', function (req, res) {
  var d = new Date().toISOString().substring(0, 19)
  usersModel.findOne({ email: req.body.email })
    .then(dados => {
      if (dados) {
        res.status(500).jsonp({ error: 'Email already in use' });

      } else {
        usersModel.register(new usersModel({
          username: req.body.username,
          name: req.body.name,
          numMecanografico: req.body.numMecanografico,
          email: req.body.email,
          type: req.body.type
        }),
          req.body.password,
          async (err, user) => {
            if (err)
              res.jsonp({ error: err, message: "Register error: " + err })
            else {
              passport.authenticate("local")(req, res, () => {
                jwt.sign({
                  email: req.user.email, type: req.user.type, username: req.user.name, numMecanografico: req.user.numMecanografico,
                  sub: 'User registered', id: req.user._id
                },
                  process.env.SECRET_KEY,
                  { expiresIn: "1h" },
                  function (e, token) {
                    if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
                    else res.status(201).jsonp({ token: token })
                  });
              })
            }
          })
      }

    })
    .catch(err => {
      res.status(500).jsonp({ error: err, message: err.message });
    })
})

/**
 * POST rota para iniciar sessão na aplicação
 */
router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log({
    email: req.user.email, type: req.user.type, numMecanografico: req.user.numMecanografico,
    sub: 'User logged in',
    id: req.user._id
  })
  jwt.sign({
    email: req.user.email, type: req.user.type, numMecanografico: req.user.numMecanografico,
    sub: 'User logged in',
    id: req.user._id
  },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
    function (e, token) {
      if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
      else res.status(201).jsonp({ "token": token })
    });
})

router.get('/', paginatedResults(usersModel), function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(res.paginatedResults);
})

router.get('/:id', auth.verificaAcesso, function (req, res) {
  users.getUser(req.params.id)
    .then(dados => res.status(200).jsonp({ dados: dados }))
    .catch(e => res.status(500).jsonp({ error: e }))
})

/**
 * PUT alterar a password de um utilizador, pode ser feito pelo utilizador em questão
 */
router.put('/:id/password', auth.verificaAcesso, function (req, res) {
  users.updateUserPassword(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.jsonp('error', { error: erro, message: "Erro na alteração do utilizador" })
    })
})

router.put('/:email/redefinePassword', function (req, res) {
  users.changePassword(req.params.email, req.body.pass)
    .then(dados => {
      console.log("DADOS: " + dados)
      res.jsonp(dados)
    })
    .catch(erro => {
      console.log("ERRO " + erro)
      console.log(erro.message);
      res.jsonp({ error: erro, message: "Erro na alteração da password" })
    })
})



/**
 * GET all the students
 */
router.get('/users/alunos', auth.verificaAcesso, function (req, res) {
  users.listAlunos()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(511).json({ error: error, message: "Could not retreive the students list" }))
});

/**
 * GET student given the ID
 */
router.get('/users/alunos/:id', auth.verificaAcesso, (req, res) => {
  users.getAluno(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(521).json({ error: error, message: "Could not obtain the student" }))
})

/**
 * GET the current maximum ID for a student
 */
router.get('/users/currentIdAluno', auth.verificaAcesso, (req, res) => {
  users.getCurrentIdAluno()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({ error: error, message: "Could not obtain the current id" }))
})

/**
 * GET all the teachers
 */
router.get('/users/docentes', auth.verificaAcesso, function (req, res) {
  users.listDocentes()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(511).json({ error: error, message: "Could not retreive the students list" }))
});

/**
 * GET teacher given the ID
 */
router.get('/users/docentes/:id', auth.verificaAcesso, (req, res) => {
  users.getDocente(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(521).json({ error: error, message: "Could not obtain the student" }))
})

/**
 * GET the current maximum ID for a teacher
 */
router.get('/users/currentIdDocente', auth.verificaAcesso, (req, res) => {
  users.getCurrentIdDocente()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({ error: error, message: "Could not obtain the current id" }))
})

/**
 * GET all the technicians
 */
router.get('/users/tecnicos', auth.verificaAcesso, function (req, res) {
  users.listTecnicos()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(511).json({ error: error, message: "Could not retreive the students list" }))
});

/**
 * GET teacher given the ID
 */
router.get('/users/tecnicos/:id', auth.verificaAcesso, (req, res) => {
  users.getTecnico(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(521).json({ error: error, message: "Could not obtain the student" }))
})

/**
 * GET the current maximum ID for a teacher
 */
router.get('/users/currentIdTecnicos', auth.verificaAcesso, (req, res) => {
  users.getCurrentIdTecnico()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({ error: error, message: "Could not obtain the current id" }))
})

/**
 * POST a student
 */
router.post('/users/alunos', auth.verificaAcesso, (req, res) => {
  users.addAluno(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(526).json({ error: error, message: "Could not insert the student" }))
})

/**
 * POST a teacher
 */
router.post('/users/docentes', auth.verificaAcesso, (req, res) => {
  users.addDocente(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(526).json({ error: error, message: "Could not insert the teacher" }))
})

/**
 * POST a technician
 */
router.post('/users/tecnicos', auth.verificaAcesso, (req, res) => {
  users.addTecnico(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(526).json({ error: error, message: "Could not insert the technician" }))
})

/**
 * PUT a student
 */
router.put('/users/alunos/:id', auth.verificaAcesso, (req, res) => {
  users.updateAluno(req.body, req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(527).json({ error: error, message: "Could not update the technician" }))
})

/**
 * PUT a teacher
 */

router.put('/users/docentes/:id', auth.verificaAcesso, (req, res) => {
  users.updateDocente(req.body, req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(527).json({ error: error, message: "Could not update the technician" }))
})

/**
 * PUT a technician
 */

router.put('/users/tecnicos/:id', auth.verificaAcesso, (req, res) => {
  users.updateTecnico(req.body, req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(527).json({ error: error, message: "Could not update the technician" }))
})

/**
 * DELETE a student
 */

router.delete('/users/alunos/:id', auth.verificaAcesso, (req, res) => {
  users.deleteAluno(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(528).json({ error: error, message: "Could not delete the student" }))
})

/**
 * DELETE a teacher
 */

router.delete('/users/docentes/:id', auth.verificaAcesso, (req, res) => {
  users.deleteDocente(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(528).json({ error: error, message: "Could not delete the teacher" }))
})

/**
 * DELETE a technician
 */

router.delete('/users/tecnicos/:id', auth.verificaAcesso, (req, res) => {
  users.deleteTecnico(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(528).json({ error: error, message: "Could not delete the technician" }))
})

/**
 * DELETE utilizador, feito pelo utilizador em questão quando quer apagar a conta ou pelo admin
 */
router.delete('/:id', auth.verificaAcesso, function (req, res) {
  users.deleteUser(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.jsonp({ error: erro, message: "Erro na remoção do utilizador" })
    })
})

module.exports = router;