const express = require('express');
const router = express.Router();
const helpers = require('../helpers')
const ApiServiceProvider = require('../Services/ApiService');

function ValidationErrorHandler(error, request, response, next){

  if(error.name === 'ValidationError') {
    return response.status(422).json({
        // iterate over keys in err.errors and add the error messages to an errors array
        errors: Object.keys(error.errors).reduce(function(errors, key) {
            errors[key] = error.errors[key].message

            return errors
        }, {})
    })
  }

  if(error.name === 'LoginError') {
    return response.status(404).json({errors: [error.message]});
  }

  next(error)
}

function checkPermission(request, response, next){
  let authorised = true;
  console.log('@todo  Permissioning middleware')
  if(!authorised){
    return response.status(403).json({error : 'You do not have permission'});
  }
  next();
}

router.use('/api', require('./api'))
router.use(ValidationErrorHandler);




module.exports = router;
