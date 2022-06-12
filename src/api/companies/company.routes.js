const CompanyRoutes = require('express').Router();
const { isCompanyAuth } = require('../../middlewares/auth/auth');
const upload = require('../../middlewares/files-cloudinary/updateFile');
const {
  register,
  login,
  logout,
  getOne,
  patchOne,
} = require('./company.controller');

CompanyRoutes.get('/:id', getOne);
CompanyRoutes.patch('/:id', patchOne);
CompanyRoutes.post('/register', register);
CompanyRoutes.post('/login', login);
CompanyRoutes.post('/logout', logout);

module.exports = CompanyRoutes;
