const mongoose = require('mongoose')
const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')
const ApiService = require('./ApiService');

class LogoutService  { 


  constructor(request)
  {
    this.request = request;
  }

  async create() {
  	
   try{
		this.request.user.tokens = this.request.user.tokens.filter(token =>{
			return token.token !== this.request.token;
		});

		await this.request.user.save();

		return {message: 'Successfully logged out'};

	}catch(error){
		return 'error logging out';
	}
  }

}

module.exports = LogoutService;