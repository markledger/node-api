const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')
const modelProvider = require('../Providers/ModelProvider');

class RegisterService { 


  constructor(request)
  {
    this.request = request;
    this.model = modelProvider(request).makeModel();
  }


  async create() {

    const model = new this.model()
    Object.assign(model, this.sanitizePostedData(this.request.body));

    const user =  await model.save();
    const token = await model.generateAuthToken();
    return {user, token};
  }

  /**
  * Filter out the non fillable properties out of a single entity.
  */
  sanitizePostedData(entity){
    return pick(entity, this.model.fillable)
  }




}

module.exports = RegisterService;