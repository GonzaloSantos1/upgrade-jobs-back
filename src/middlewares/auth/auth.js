const { setError } = require('../../utils/errors/errors');
const User = require('../../api/users/user.model');
const Company = require('../../api/companies/company.model');
const JwtUtils = require('../../utils/jwt/jwt');

const isUserAuth = async (req, res, next) => {
  try {
    const token = req.headers.autorization;
    if (!token) {
      return next(setError(401, 'No token provided'));
    }
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.SECRET);
    const userLogued = await User.findById(validToken.id);
    req.user = userLogued;
    next();
  } catch (error) {
    return next(setError(401, 'server failed to authenticate'));
  }
};

const isCompanyAuth = async (req, res, next) => {
  try {
    const token = req.headers.autorization;
    if (!token) {
      return next(setError(401, 'No token provided'));
    }
    const parsedToken = token.replace('Bearer ', '');
    const validToken = JwtUtils.verifyToken(parsedToken, process.env.SECRET);
    const userLoged = await Company.findById(validToken.id);
    req.company = userLoged;
    next();
  } catch (error) {
    return next(setError(401, 'server failed to authenticate'));
  }
};

module.exports = { isUserAuth, isCompanyAuth };
