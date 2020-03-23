'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/:workspaceId/:workspaceName', (req, res, next) => {
  const mail = {
    from: `Tasksy <${process.env.EMAIL}>`,
    to: req.body.email,
    subject: `TASKSY - Woorkspace Invitation`,
    text: `Welcome to TASKSY! You were invited to join ${req.paramsworkspaceName}. Please follow the link:
          https://ironhack-project3-teste.herokuapp.com/forWorkspaceApproval/${req.params.workspaceId}`
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      });
    } else {
      res.json({
        msg: 'success'
      });
    }
  });
});

module.exports = router;
