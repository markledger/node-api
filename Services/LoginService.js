const mongoose = require('mongoose')
const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')
const ApiService = require('./ApiService');

class LoginService extends ApiService { 


  constructor(request)
  {
    super(request)
  }


  async get(){

  }


  async create() {
    try{
       const user = await this.model.findByLoginCredentials(this.request.body.email, this.request.body.password);
       const token = await user.generateAuthToken()
       return {user, token};
    }catch(error){
      return error.message;
    }
  }

  /**
  * Filter out the non fillable properties out of a single entity.
  */
  sanitizePostedData(entity){
    return pick(entity, this.model.fillable)
  }

  
  async updateOne() {
    
  
    
  }



}

module.exports = LoginService;