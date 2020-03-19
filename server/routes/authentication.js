'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.json({ user });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

//rota para user information
router.get('/user-information', (req, res, next) => {
  res.json({ user: req.user || null });
});

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

//rota para editar User - que não esta logado - para scores
router.put('/edit/:userId', (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

const uploader = require('./../multer-configure.js');

router.patch('/user-information', uploader.single('picture'), async (req, res, next) => {
  const { email, name } = req.body;
  let picture;
  if (req.file) picture = req.file.url;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        ...(picture ? { picture } : {})
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});



router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = router;
