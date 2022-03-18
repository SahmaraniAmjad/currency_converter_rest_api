const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('user', new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  conversion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversion',
  },
}));

/* 
Start
Signup Validation
*/
function validateSignUp(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateSignUp;
