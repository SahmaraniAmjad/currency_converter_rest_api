const mongoose = require('mongoose');
const Joi = require('joi');

/*
Start
schema represent how our conversion data will look
*/
const Conversion = mongoose.model('conversions', new mongoose.Schema({
  currencyFrom: {
    type: String,
    required: true,
  },
  currencyTo: {
    type: String,
    required: true,
  },
  amountInitial: {
    type: Number,
    required: true,
  },
  amountResult: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}));
/* End */

/*
Start
parameter validation 
*/
const validateConversion = (conversion) => {
  const schema = {
    currencyFrom: Joi.string().uppercase().min(3).max(3).required(),
    currencyTo: Joi.string().uppercase().min(3).max(3).required(),
    amountInitial: Joi.number().positive().required(),
  };
  return Joi.validate(conversion, schema);
};
/* End */

module.exports.Conversion = Conversion;
module.exports.validate = validateConversion;