const express = require('express');
const { register, login } = require('../controllers/user.controller');
const { addConversion, getConversionsByUser} = require('../controllers/conversion.controller');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

router.post('/convert', checkAuth, addConversion);
router.get('/history', checkAuth, getConversionsByUser);

module.exports = {
  routes: router
}