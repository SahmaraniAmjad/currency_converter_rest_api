const express = require('express');
const { register, login } = require('../controllers/user.controller');
const { addConversion, getconversionsById} = require('../controllers/conversion.controller');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

router.post('/convert', checkAuth, addConversion);
router.get('/history', checkAuth, getconversionsById);

module.exports = {
  routes: router
}