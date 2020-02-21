const mongoose = require('mongoose');
const helpers = require('../helpers');
const get = require('lodash/get');
const mung = require('express-mung');
const modelProvider = require('../Providers/ModelProvider');


function transform(entity, preserveFields)
{
	const transformed = {};

	for(property in entity){
		if(!preserveFields.includes(property)){
			continue;
		}
		transformed[property] = entity[property];
	}
	return transformed;
}

function removeHiddenOnApiFields(body, request, response, ){
	const model = modelProvider(request).makeModel()// mongoose.model(helpers.ucfirst(request.params.entity));
	const transformed = [];
	return;
	return body.map((entity) => {
		console.log(entity);
		return transform(entity, model.showOnApi)
	});

}

module.exports = mung.json(removeHiddenOnApiFields);