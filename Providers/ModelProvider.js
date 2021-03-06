const helpers = require('../helpers')
const mongoose = require('mongoose')

module.exports  = function(request){
  const entity = helpers.ucfirst(request.params.entity);
 
  function makeModel(){
    switch(entity){
      case 'Logout':
        return null;    
      case 'Login':
      case 'Register':
        return mongoose.model('User');
      default:
        return mongoose.model(entity);
    }
  }

  return {
    makeModel
  };

}