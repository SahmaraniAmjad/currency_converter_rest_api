const express = require('express');
const { addConversion, getAllConversions} = require('../controllers/conversion.controller');

const router = express.Router();

router.post('/convert', addConversion);
router.get('/history', getAllConversions);

module.exports = {
  routes: router
}