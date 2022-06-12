const Company = require('./company.model');
const {generateToken} = require('../../utils/jwt/jwt');
const bcrypt = require('bcrypt');
const {setError} = require('../../utils/errors/errors');
const HTTPSTATUSCODE = require('../../utils/httpStatusCode');

const register = async (req, res, next) => {
  try {
    const company = new Company(req.body);
    if (req.file) company.info.img = req.file.path;
   
    const companyExist = await Company.findOne({cif: company.cif});
    if (companyExist) {
      return next(setError(400, 'Company already registered'));
    }
    const companyDB = await company.save();
    return res.status(201).json(companyDB);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const company = await Company.findOne({cif: req.body.cif});
    if (!company) {
      return res.status(204).json();
    }
    if (!bcrypt.compareSync(req.body.password, company.password)) {
      return res.status(204).json();
    }

    if (bcrypt.compareSync(req.body.password, company.password)) {
      const token = generateToken(company._id, company.cif);
      return res.status(200).json([token, company]);
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
    const company = new Company(req.body);
    company._id = id;
    if (req.file) company.img = req.file.path;
    const updateCompany = await Company.findByIdAndUpdate(id, company);
    return res.status(200).json(updateCompany);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const company = await Company.findById(id).populate('offers');
    res.status(200).json(company);
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
