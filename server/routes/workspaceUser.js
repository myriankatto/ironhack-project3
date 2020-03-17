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

//route to retrieve the users from single workspace
router.get('/usersFromWorkspace/:workspaceId', (req, res, next) => {
  User.find({ workspace: req.params.workspaceId })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

//route to retrieve the users from single workspace for approval
router.put('/accept/:userId', (req, res, next) => {
  User.update({ _id: req.params.userid }, { $pull: { workspace: req.body.workspace } })
    .then(() =>
      User.update({ _id: req.params.userId }, { $push: { workspaceApproved: req.body.workspace } })
    )
    .catch(error => {
      res.json(error);
    });
});

router.put('/accept/:userid/:userWorkspace', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userid,
    { $push:{workspaceApproved: req.params.userWorkspace}, $pull: { workspace: req.params.userWorkspace } },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;

// on app.js => app.use('/api/workspaceUser', require('./routes/workspaceUser'));
