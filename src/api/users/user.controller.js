const User = require('./user.model');
const {generateToken} = require('../../utils/jwt/jwt');
const bcrypt = require('bcrypt');
const {setError} = require('../../utils/errors/errors');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    if (req.files) user.img = req.files[0].path;
    if (req.files) user.cv = req.files[1].path;
   
    const userExist = await User.findOne({email: user.email});
    if (userExist) {
      return next(setError(400, HTTPSTATUSCODE[400]));
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(204).json();
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(204).json();
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      const {id} = req.params
      return res.status(200).json([token, user]);
    }
  } catch (error) {}
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = new User(req.body);
    user._id = id;
    if(req.files) {
      for (const file of req.files) {
        if(file.fieldname === 'img') {
          user.img = file.path
        }
        if(file.fieldname === 'cv') {
          user.cv = file.path
        }
      }
    }
    const updateUser = await User.findByIdAndUpdate(id, user);
    return res.status(200).json(updateUser);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getOne,
  patchOne,
};
