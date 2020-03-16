'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const Task = require('./../models/task');

//rota para tasks geral
router.get('/', (req, res, next) => {
  Task.find()
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
// router.post('/create', (req, res, next) => {
//   Task.create({ ...req.body })
//     .then(task => {
//       res.json(task);
//     })
//     .catch(error => {
//       res.json(error);
//     });
// });

//rota para criar task
router.post('/create/:id', (req, res, next) => {
  console.log("REQ.BODY",req.body);
  // console.log('USER ID:      '+req.user._id);

  Task.create({
    name: req.body.name,
    // level:req.body.level,
    // urgency:req.body.urgency,
    // user:req.user._id
    // workspace:req.params.id
    
  })
    .then(task => {
      console.log('HEREEEE '+task);
      res.json(task);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para editar workspace
router.put('/edit/:taskid', (req, res, next) => {
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
