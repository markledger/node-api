const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = async function authorisation(request, response, next){
	try{ 
console.log(process.env.SALT)
		const token = request.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.SALT)
		const user = await mongoose.model('User').findOne({ '_id': decoded._id, 'tokens.token' : token });
		console.log(decoded);
		if(!user){
			throw new Error();
		}
		request.user = user;
		request.token = token;
		next()

	}catch(error){
		response.status(401).send({error:"Please login, you are unauthenticated."})
	}
}