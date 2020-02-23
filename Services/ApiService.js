const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../helpers')
const modelProvider = require('../Providers/ModelProvider');

class ApiService { 


  constructor(request)
  {
    this.request = request;
    this.model = modelProvider(request).makeModel();
  }


  async get(){

    const id = get(this.request.params, 'id');
    const page = parseInt(this.request.params.page, 10) || 1;
    const limit = parseInt(this.request.params['per-page'], 10) || 5;
    const sort = this.getSortBy();
    const populate = this.filterRequestedRelationships();
console.log({populate, page, limit, sort})
    if(!id){
      return await this.model.paginate({}, {populate, page, limit, sort});
    }

    return [await this.model.paginate({id}, {populate, page, limit, sort})];

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

  /**
  * Filter the requested 'with' relationships requested in the query string
  * against the valid list available for inclusion that is set on the schema.
  */
  filterRequestedRelationships(){
  
    const requestedRelationships = get(this.request.query, 'with');
    if(!requestedRelationships){
      return [];
    }
    return requestedRelationships.split(',')
              .filter(relation => this.model.withRelationships.includes(relation));
  }

  /**
  * Fetch the sort by paramter after filtering against valid list of options.
  * Only return the first to sort by.
  */
  getSortBy(){
    const sortBy = get(this.request.query, 'sort');
    if(!sortBy){
      return [];
    }


    let sort = sortBy.split(',')
                     .filter(sortType => this.model.sortBy.includes(sortType))
                     .shift()

    sort = sort.split('|');
    let order = sort[1] === 'asc' ? '' : '-';
    return `${order}${sort[0]}`
  }


}

module.exports = ApiService;