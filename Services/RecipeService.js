const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')
const modelProvider = require('../Providers/ModelProvider');
const ApiService = require('./ApiService');

class RecipeService extends ApiService { 


  async create() {

    const recipe = new this.model({
      ...this.sanitizePostedData(this.request.body),
      owner: this.request.user._id
    });


    return [await recipe.save()];
  }

 

  
  async updateOne() {
    
    const model = (await this.get()).pop();

    if (!model){
      return null; 
    }

    const updatedModel = Object.assign(model, this.sanitizePostedData(this.request.body));
    updatedModel.touchUpdatedTimestamp();
  
    return [await updatedModel.save()];  
    
  }



}

module.exports = RecipeService