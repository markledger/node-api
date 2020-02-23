const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const validator = require('validator');
const LoginError = require('../Exceptions/LoginException');
const mongoosePaginate = require('mongoose-paginate');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "can't be blank"],
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  
    }
}, { timestamps: true });

RecipeSchema.plugin(mongoosePaginate)
RecipeSchema.statics.fillable = ['name','owner'];

//list the relationships which can be expanded using the ?with= 
RecipeSchema.statics.withRelationships = ['owner'];
RecipeSchema.statics.sortBy = ['createdAt|desc', 'createdAt|asc', 'name|asc', 'name|desc'];

RecipeSchema.plugin(uniqueValidator, {message: 'is already taken'});

RecipeSchema.methods.touchUpdatedTimestamp = function(){
    this.updatedAt = new Date();
}


mongoose.model('Recipe', RecipeSchema)