var express = require('express');
var router = express.Router();
const ApiServiceProvider = require('../Services/ApiService');
const mongoose = require('mongoose');
const ApiController = require('../http/controllers/ApiController');
const baseRoute = '^/:entity(user)';


router.get(`${baseRoute}/:id?`, ApiController.get);
router.put(`${baseRoute}/:id`, ApiController.update);


router.post(baseRoute, async function(req, res, next) {
    const service = new ApiServiceProvider(req);
     
    try{
      const savedEntity = await service.create();
      return res.status(201).json({ savedEntity });
       
    } catch(err){
      return next(err);
    }
  
});



// router.put(`${baseRoute}/:id`, async function(req, res, next){
//  const service = new ApiServiceProvider(req);
//   try{
//     const updatedUser = await service.update();
//     return res.status(200).json(updatedUser);
//   }catch(err){
//    return next(err);
//   }

// });


   


module.exports = router;
