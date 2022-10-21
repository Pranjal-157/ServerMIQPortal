const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const dotenv = require("dotenv");
dotenv.config();


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true, maxlength: 32, trim: true},
    lastName: {type: String, maxlength: 32, trim: true},
    userName: {type: String, required: true, maxlength: 32, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    salt: String,
    hash: String,
}, {timestamps: true})

userSchema.methods.generateAuthToken = function(){
    let user = {
        username: this.userName,
        fullName: `${this.firstName} ${this.lastName}`
    };
    const token = jwt.sign(user, process.env.JWTPRIVATEKEY, {expiresIn:"14d"})
    return token;
}

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName : Joi.string().required().label('First Name'),
        lastName : Joi.string().required().label('last Name'),
        userName : Joi.string().required().label('User Name'),
        email : Joi.string().required().label('Email'),
        password : passwordComplexity().required().label('Password'),
        confirmPassword : passwordComplexity().required().label('Confirm Password'),
    });
    return schema.validate(data)
};

module.exports = {User, validate};