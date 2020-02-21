const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const validator = require('validator');
const LoginError = require('../Exceptions/LoginException');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trime: true,
        required: [true, "can't be blank"],
        trim: true
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, "can't be blank"],
        trim: true
    },
    password:{
        type: String,
        required: [true, "can't be blank"],
        minlength: 8
    },
    email: {
        type: String,
        lowercase: true,
        trim:true,
        unique: true,
        required: [true, "can't be blank"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email.")
            }
        },
        index: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


UserSchema.statics.fillable = ['first_name','last_name', 'email', 'password']; 
UserSchema.statics.showOnApi = ['_id','user', 'first_name','last_name', 'email', 'token', 'createdAt', 'updatedAt'];

UserSchema.plugin(uniqueValidator, {message: 'is already taken'});

UserSchema.methods.touchUpdatedTimestamp = function(){
    this.updatedAt = new Date();
}

UserSchema.statics.findByLoginCredentials = async function(email, password){
    const user  = await mongoose.model('User').findOne({email});
    if(!user){
      throw new LoginError("Unable to login");
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new LoginError("Unable to login");
    }

    return user;
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    console.log(user._id);
    const token = jwt.sign({ _id: user._id }, process.env.SALT);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

UserSchema.pre('save', async function(next) {
    const user = this;
    
    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 8)

    next();
});


// model can be accessed anywhere in application with mongoose.model('User')
mongoose.model('User', UserSchema)