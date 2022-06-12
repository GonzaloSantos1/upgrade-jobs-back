const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const CompanySchema = new Schema(
  {
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    cif: {type: String, require: true},
    info: 
      {
        description: {type: String},
        img: {type: String},
        location: {type: String},
        web: {type: String},
        employees: {type: Number},
      
      },
    
    offers: [{type: Schema.Types.ObjectId, ref: 'offers'}],
  },
  {timestamps: true}
);

CompanySchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Company = mongoose.model('companies', CompanySchema);
module.exports = Company;
