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

//this service will search the workspaces from a user ==> we are using this to form the list of users
router.get('/userWorkspacesApproved/:userid', (req, res, next) => {
  User.find({ _id: req.params.userid }, { new: true })
    .populate('workspaceApproved')
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

//route to retrieve approved users from single workspace
router.get('/approvedUser/:workspaceId', (req, res, next) => {
  User.find({ workspaceApproved: req.params.workspaceId })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

////route to approve the users
router.put('/accept/:userid/:userWorkspace', (req, res, next) => {
  console.log('hi');
  User.findByIdAndUpdate(
    req.params.userid,
    {
      $push: { workspaceApproved: req.params.userWorkspace },
      $pull: { workspace: req.params.userWorkspace }
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});
//route to reject an users from the user that are pending
router.put('/reject/:userid/:userWorkspace', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userid,
    {
      $pull: { workspace: req.params.userWorkspace }
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});
//route to reject an users from a workspace. A user that was previously approved
router.put('/rejectPreviouslyApprovedUser/:userid/:userWorkspace', (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userid,
    {
      $pull: { workspaceApproved: req.params.userWorkspace }
    },
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
