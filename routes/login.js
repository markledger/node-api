var express = require('express');
var router = express.Router();
const ApiServiceProvider = require('../Services/ApiService');
const mongoose = require('mongoose');

router.post('/login', async function(request, response, next) {
    const service = new ApiServiceProvider(request);
     
    try{
      const savedEntity = await service.create();
      return response.status(201).json({ savedEntity });
       
    } catch(err){
      return next(err);
    }
  
});


module.exports = router;
