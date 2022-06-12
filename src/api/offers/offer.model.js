const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema(
  {
    title: {type: String, require: true},
    location: {type: String, require: true},
    description: {type: String, require: true},
    category: {type: String, require: true},
    vacants: {type: Number},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'companies', required: false},
    candidates: [{type: Schema.Types.ObjectId, ref: 'users'}],
    gestionDate: {type: Number},
  },
  {timestamps: true}
);

const Offer = mongoose.model('offers', OfferSchema);
module.exports = Offer;
