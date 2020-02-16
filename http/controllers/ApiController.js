const mongoose = require('mongoose');
const pick = require('lodash/pick');
const get = require('lodash/get');
const helpers = require('../../helpers');
const ApiService = require('../../Services/ApiService');

function makeService(request)
{
	return new ApiService(request);
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


exports.update = async (request, response, next) => {

	const service = new makeService(request);
	try{
		const updatedUser = await service.update();
		console.log("update in controller", updatedUser)
		return response.status(200).json(updatedUser);

	}catch(err){
		return next(err);

	}	
}

