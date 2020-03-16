'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const Workspace = require('./../models/workspace');

//rota para workspaces geral
router.get('/', (req, res, next) => {
  Workspace.find()
    .populate('owner')
    .then(workspaces => {
      res.json(workspaces);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para single workspace
router.get('/:workspaceid', (req, res, next) => {
  Workspace.findById(req.params.workspaceid)
    .populate('owner')
    .then(workspace => {
      res.json({workspace});
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para criar workspace
router.post('/create', (req, res, next) => {
  Workspace.create({
    name: req.body.name,
    operator: req.user._id
  })
    .then(workspace => {
      res.json(workspace);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para editar workspace
router.put('/edit/:workspaceid', (req, res, next) => {
Workspace.findByIdAndUpdate(req.params.workspaceid, req.body, {new:true})
    .then(workspace => {
      res.json(workspace);
    })
    .catch(error => {
      res.json(error);
    });
});

//rota para deletar workspace
router.delete('/:workspaceid', (req, res, next) => {
  Workspace.findByIdAndRemove(req.params.workspaceid)
    .then(() => {
      res.json({ message: `Workspace with ${req.params.workspaceid} is removed succesfully` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
