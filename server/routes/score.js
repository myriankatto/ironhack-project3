'use strict';

const { Router } = require('express');

const User = require('./../models/user');
const Workspace = require('./../models/workspace');

const router = new Router();



//rota para single user diferente do usuário logado
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para editar User - que não esta logado - para scores - PUSH
router.put('/edit/push/:userId', (req, res, next) => {

  const workspace = req.body.workspace;
  const score = req.body.score;
  

  User.findByIdAndUpdate(
    req.params.userId, 
    {
      $push: { 
       scoreUser : {workspace, score}
      }
    }, 
  { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });

});

//rota para editar User - que não esta logado - para scores - PULL
router.put('/edit/pull/:userId', (req, res, next) => {
  
  const workspace = req.body.workspace;
  const score = req.body.score;
  
  User.findByIdAndUpdate(
    req.params.userId, 
    {
      $pull: { 
        scoreUser : {workspace, score}
       }
    }, 
  { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });

});

//ROTA PARA ORGANIZAR USUÁRIOS
router.get('/list/totalScore/:workspaceId', (req,res,next) => {
  User.find({ scoreUser : { $elemMatch : { workspace: req.params.workspaceId } } } )
    .then( user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});


//rota para editar Workspace
router.put('/editWorspace/:workspaceId', (req, res, next) => {
  
  
  const score = req.body.score;
  
  Workspace.findByIdAndUpdate(
    req.params.workspaceId, 
    {
      score
    }, 
  { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });

});



module.exports = router;
