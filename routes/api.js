var express = require('express');
var router = express.Router();
const ApiServiceProvider = require('../Services/ApiService');
const mongoose = require('mongoose');
const ApiController = require('../http/controllers/ApiController');
const authorisation = require('../middleware/authorisation');

const commonRoutes = ['user'];
const baseRoute = {
	'get' : `^/:entity(${commonRoutes.join('|')})`,
	'post' :  `^/:entity(${commonRoutes.join('|')})`,	
	'put' :  `^/:entity(${commonRoutes.join('|')})`
};


router.post('/register', function(req,res,next){
	req.params.entity = 'register';
	next()
}, ApiController.create);



router.post('/login', function(req,res,next){
	req.params.entity = 'login';
	next()
}, ApiController.create);


router.post('/user/logout', function(req,res,next){
	req.params.entity = 'logout';
	next()
}, ApiController.create);


router.get(`${baseRoute.get}/:id?`, authorisation, ApiController.get);
router.put(`${baseRoute.put}/:id`, authorisation, ApiController.updateOne);
router.post(baseRoute.post, authorisation, ApiController.create);


module.exports = router;
