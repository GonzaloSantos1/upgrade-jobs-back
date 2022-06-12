const OfferRoutes = require('express').Router();
const {isCompanyAuth, isUserAuth} = require('../../middlewares/auth/auth');

const {getAll, getOne, postOne, patchOne, deleteOne} = require('./offer.controller');

OfferRoutes.get('/', getAll);
OfferRoutes.get('/:id', getOne);
OfferRoutes.post('/', postOne);
OfferRoutes.patch('/:id', patchOne);
OfferRoutes.delete('/:id', deleteOne);

module.exports = OfferRoutes;
