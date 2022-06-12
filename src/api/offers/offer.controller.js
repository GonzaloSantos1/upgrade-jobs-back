const Offer = require('./offer.model');

const getAll = async (req, res, next) => {
  try {
    const offers = await Offer.find().populate('company').populate('candidates');
    res.status(200).json(offers);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const offer = await Offer.findById(id).populate('company').populate('candidates');
    res.status(200).json(offer);
  } catch (error) {
    return next(error);
  }
};

const postOne = async (req, res, next) => {
  try {
    const offer = new Offer(req.body);

    const offersDB = await offer.save();
    return res.status(201).json(offersDB);
  } catch (error) {
    return next(error);
  }
};

const patchOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const offer = new Offer(req.body);
    offer._id = id;
    const updateOffer = await Offer.findByIdAndUpdate(id, offer);
    return res.status(200).json(updateOffer);
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const offer = await Offer.findByIdAndRemove(id);
    return res.status(200).json(offer);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  postOne,
  patchOne,
  deleteOne,
};
