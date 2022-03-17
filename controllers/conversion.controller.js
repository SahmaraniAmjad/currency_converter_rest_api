const mongoose = require('mongoose');
const _ = require('lodash');
const fetch = require('node-fetch');
const { Conversion, validate } = require('../models/conversion.model');

/*
Start
fetch all the currencies
*/
const fetchCurrencies = async () => {
  try {
    const url = `http://openexchangerates.org/api/currencies.json`;
    const res = await fetch(`${url}`);
    const currencies = await res.json();
    return currencies;
  } catch (err) {
    console.log(err)
  };
};
/* End */

/* 
Start
fetch currencies's rates
*/
const fetchRates = async (base = "EUR") => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `http://data.fixer.io/api/latest?access_key=${apiKey}&format=1`;
    const res = await fetch(`${url}?base=${base}`);
    const rates = await res.json();
    return rates.rates;
  } catch (err) {
    console.log(err)
  };
};
/* End */

/*
Start 
currency conversion function
*/
async function convert(amount, from, to) {
  const rates = await fetchRates(from);
  let fromRate = rates[from];
  let toRate = rates[to];
  const convertedAmount = (toRate / fromRate) * amount;
  return Math.round(convertedAmount);
};

// paramter validation + add conversion result to the DB
const addConversion = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);
  const data = req.body;

  // get the result of currency conversion
  const result = await convert(data.amountInitial, data.currencyFrom, data.currencyTo);
  let time = new Date();

  // Check if the format of the Currencies passed are right
  const currencies = await fetchCurrencies();
  const keys = Object.keys(currencies);
  if ((!keys.includes(data.currencyFrom)) || (!keys.includes(data.currencyTo))) {
    return res.status(400).send({
      message: 'from Currency Format or to Currency format is wrong'
    });
  };
  let conversion = await new Conversion({
    _id: mongoose.Types.ObjectId(),
    currencyFrom: data.currencyFrom,
    currencyTo: data.currencyTo,
    amountInitial: data.amountInitial,
    amountResult: result,
    createdAt: time
  });

  // save to the db 
  conversion = await conversion.save();
  return res.status(200).send(_.pick(conversion,
    ['currencyFrom',
      'currencyTo',
      'amountInitial',
      'amountResult',
      'createdAt']));
};
/* End */

/*
Start 
get all the conversion history
*/
const getAllConversions = (req, res, next) => {
  // send all the parameters without _id and __v
  Conversion.find({}, { _id: 0, __v: 0 }, (err, allConversions) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ ConversionHistory: allConversions });
    }
  });
};
/* End */

/* 
Start
get histroy conversion per user
*/
const getconversionsById = (req, res, next) => {
  Conversion
    .find()
    .populate("user")
    .then(user => {
      res.json(user);
    }).catch(err => {
      res.status(400).json({
        error: err.message
      })
    })
}
/* End */

module.exports = {
  getAllConversions,
  addConversion,
  getconversionsById,
};