const mongoose = require('mongoose')
const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')

class ApiService { 


  constructor(request)
  {
    this.request = request;
    this.model = mongoose.model(helpers.ucfirst(request.params.entity));
  }


  async get(){

    const id = get(this.request.params, 'id');
    const page = parseInt(this.request.params.page, 10) || 0;
    const perPage = parseInt(this.request.params['per-page'], 10) || 5;

    if(!id){
      return await this.model.find({})
                      .limit(perPage)
                      .skip(perPage * 0)
                      .sort('-createdAt');
    }

    return [await this.model.findById(id)];

  }


  async create() {
    const model = new this.model()
    Object.assign(model, this.sanitizePostedData(this.request.body));

    return [await model.save()];
  }

  /**
  * Filter out the non fillable properties out of a single entity.
  */
  sanitizePostedData(entity){
    return pick(entity, this.model.fillable)
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

module.exports = ApiService;