'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const Workspace = require('./../models/workspace');
const router = new Router();

//rota para editar user
router.put('/edit/:userid', (req, res, next) => {
  User.findByIdAndUpdate(req.params.userid, req.body, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

//route to retrieve the workspace wich the user is the same as the operaor
router.get('/editWorkspace/:userId', (req, res, next) => {
  Workspace.find({ operator: req.params.userId })
    .then(workspaces => {
      res.json(workspaces);
    })
    .catch(error => {
      res.json(error);
    });
});
module.exports = router;

// on app.js => app.use('/api/workspaceUser', require('./routes/workspaceUser'));
