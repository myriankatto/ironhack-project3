'use strict';

const { Router } = require('express');
const User = require('./../models/user');
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

module.exports = router;

// on app.js => app.use('/api/workspaceUser', require('./routes/workspaceUser'));
