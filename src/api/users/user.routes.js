const UserRoutes = require('express').Router();
const { isUserAuth } = require('../../middlewares/auth/auth');
const upload = require('../../middlewares/files-cloudinary/updateFile');
const {
  register,
  login,
  logout,
  getOne,
  patchOne,
} = require('./user.controller');

UserRoutes.get('/:id', getOne);
UserRoutes.patch('/:id', upload.any(), patchOne);
UserRoutes.post('/register', upload.any(), register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', logout);

module.exports = UserRoutes;
