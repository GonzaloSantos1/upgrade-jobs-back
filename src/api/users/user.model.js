const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    img: {type: String},
    cv: {type: String},
    candidatures: [{type: Object}]
  },
  {timestamps: true}
);

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
