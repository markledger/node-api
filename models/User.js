const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trime: true,
        // [required parameter, error message to show if param not present] 
        required: [true, "can't be blank"],
        trim: true
    },
    last_name: {
        type: String,
        trim: true,
        // [required parameter, error message to show if param not present] 
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
        match: [/\S+@\S+\.\S+/, "is invalid"],
        index: true
    }
    // include createdAt and updatedAt field on model with timestamps: true
}, { timestamps: true });


UserSchema.statics.fillable = ['first_name','last_name', 'email', 'password']; 
UserSchema.statics.showOnApi = ['_id','first_name','last_name', 'email', 'createdAt', 'updatedAt'];

// register uniqueValidator plugin
UserSchema.plugin(uniqueValidator, {message: 'is already taken'});


UserSchema.pre('save', async function(next) {
    const user = this;
    
    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 8)

    next();
});

// register schema with mongoose
// model can be accessed anywhere in application with mongoose.model('User')
mongoose.model('User', UserSchema)