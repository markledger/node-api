var express = require('express');
var router = express.Router();
const ApiServiceProvider = require('../Services/ApiService');
const mongoose = require('mongoose');
const ApiController = require('../http/controllers/ApiController');
const baseRoute = '^/:entity(user)';


router.get(`${baseRoute}/:id?`, ApiController.get);
router.put(`${baseRoute}/:id`, ApiController.updateOne);
router.post(baseRoute, ApiController.create);
  

module.exports = router;
