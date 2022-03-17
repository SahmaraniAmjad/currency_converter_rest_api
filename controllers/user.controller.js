const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, validate } = require('../models/user.model');

/* Start 
registration and add user to the db
*/
const register = async (req, res, next) => {

  const { error } = validate(req.body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }

  // check if the user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send('This user already exisits');

  } else {
    // Insert new user
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    // secure the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save()
    res.send(_.pick(user, ['name', 'email', 'password']));
  }
}
/* End */

/*
Start - login 
*/ 
const login = async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  // User authentication
  let user = await User.findOne({ email: req.body.email });
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!user) {
    return res.status(401).send({ message: 'Authorization Failed' });
  } else if (!validPassword) {
    return res.status(401).send({ message: 'Authorization Failed' });
  } else {
    const token = jwt.sign({
      _id: user._id
    },
      process.env.JWT_KEY,
      { expiresIn: "1h", }
    );
    res.status(200).send({
      message: "Authentication successfull",
      token: token
    });
  }
};
/* End */

/*
Start
validation of login form
*/
function validateLogin(user) {
  const schema = {
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  };
  return Joi.validate(user, schema);
};
/* End */

module.exports = {
  register,
  login
}