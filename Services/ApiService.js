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


  create() {
    const model = new this.model()

    this.mapRequestDataToModel(model)

    return  model.save();
  }

  mapRequestDataToModel(data)
  {
    const fillableAttributes = pick(this.request.body, this.model.fillable);
    return data.map(entity => {
       Object.assign(entity, fillableAttributes);
    });
   
  }

  touchUpdatedTimestamp(data){
    return data.map(entity => {
        return entity.updatedAt = new Date();
    });
  }

  
  async update() {
    
    const data = await this.get();

    if (!data){
      return null; 
    }

    this.mapRequestDataToModel(data);
    this.touchUpdatedTimestamp(data);
      
    const savePromises = [];
    data.forEach(entity => savePromises.push(entity.save()));
    return await Promise.all(savePromises);
    
  }



}

module.exports = ApiService;