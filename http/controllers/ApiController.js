const mongoose = require('mongoose');
const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../../helpers');
const ApiService = require('../../Services/ApiService');
const fs = require('fs')

function makeService(request)
{

	const entity = helpers.ucfirst(request.params.entity);

	const basePath = './Services/'
	try {
	  if (fs.existsSync(`${basePath}${entity}Service.js`)) {
	    const CustomService = require(`../.${basePath}${entity}Service`);
	    
		return new CustomService(request);
	  }
	  return new ApiService(request);	
	} catch(err) {
	  console.error("ERROR CREATING SERVICE", err)
	}
	
};


exports.get = async (request, response, next) => {

	const service = makeService(request);

	try{
    	const data = await service.get();
 
    	if(!data){
			return response.status(404).json([]);
    	}

    	return response.status(200).json(data);

    }catch(error){
    	return next(error);
    }

}


exports.updateOne = async (request, response, next) => {

	const service = new makeService(request);
	try{
		const updatedEntity = await service.updateOne();
		return response.status(200).json(updatedEntity);

	}catch(err){
		return next(err);

	}	
}


exports.create = async (request, response, next) => {

	 const service = makeService(request);

	 try{
	    const savedEntity = await service.create();	  
		return response.status(201).json(savedEntity);
	       
    } catch(err){

      return next(err);
    }
}