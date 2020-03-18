'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const Task = require('./../models/task');


//rota para tasks APROVADAS geral
router.get('/list/:workspaceId', (req, res, next) => {
  const id = req.params.workspaceId;
  
  Task.find({ "$and": [{"workspace": id}, {"approved": "true"}]})
    .populate('owner', 'creator')
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para tasks em estágio de APROVAÇÃO geral
router.get('/list/pending/:workspaceId', (req, res, next) => {
  const id = req.params.workspaceId;
  
  Task.find({ "$and": [{"workspace": id}, {"approved": "false"}]})
    .populate('owner', 'creator')
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para single task
router.get('/:taskid', (req, res, next) => {
  Task.findById(req.params.taskid)
    .populate('owner', 'creator')
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      res.json(error);
    });
});


//rota para criar task
router.post('/create/:id', (req, res, next) => {
  // console.log('ROTA TÁ FUNCIONANDO');
  // console.log(req.body);

  Task.create({
    name: req.body.name,
    frequency: req.body.frequency,
    level:req.body.level,
    personal: req.body.personal,
    urgency:req.body.urgency,
    creator:req.user._id,
    workspace:req.params.id,
    description: req.body.description,
    approved:req.body.approved
  })
    .then(task => {
      
      res.json(task);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para editar Task - Apenas Operador pode faze-lo
router.put('/edit/:taskid', (req, res, next) => {
  // console.log('ROTA TÁ FUNCIONANDO');
  // console.log('EDIT',req.body);

  Task.findByIdAndUpdate(req.params.taskid, req.body, { new: true })
    .then(task => {
      res.json(task);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para deletar workspace
router.delete('/:taskid', (req, res, next) => {
  Task.findByIdAndRemove(req.params.taskid)
    .then(() => {
      res.json({ message: `Task with ${req.params.taskid} is removed succesfully` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
