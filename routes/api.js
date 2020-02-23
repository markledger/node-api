	var express = require('express');
var router = express.Router();
const ApiServiceProvider = require('../Services/ApiService');
const mongoose = require('mongoose');
const ApiController = require('../http/controllers/ApiController');
const authorised = require('../middleware/authorisation');

const commonRoutes = ['user', 'recipe'];
const baseRoute = {
	'get' : `^/:entity(${commonRoutes.join('|')})`,
	'post' :  `^/:entity(${commonRoutes.join('|')}|logout)`,	
	'put' :  `^/:entity(${commonRoutes.join('|')})`
};


router.post('/register', function(req, res, next){
	req.params.entity = 'register';
	next()
}, ApiController.create);



router.post('/login', function(req, res, next){
	req.params.entity = 'login';
	next()
}, ApiController.create);


router.get('/user/me', authorised, function(request, response, next){
	return response.status(200).send(request.user);
})

router.get(`${baseRoute.get}/:id?`, authorised, ApiController.get);
router.put(`${baseRoute.put}/:id`, authorised, ApiController.updateOne);
router.post(baseRoute.post, authorised, ApiController.create);


module.exports = router;
