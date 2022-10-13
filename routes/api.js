const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

const db = 'mongodb+srv://loginuserdata:loginuserdata123@usersdb.abl7kw4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db, (err) => {
   if(err){
    console.log(`Error occured ${err}`);
   }else{
    console.log('Connected to mongodb');
   }
})

router.get('/', (req,res) => {
   res.send('From api route') 
})

router.get('/')


//register user
router.post('/register', (req,res) => {
    const userData = req.body;
    const user = new User(userData);
    user.save((error,registeredUser) => {
        if(error){
            console.log(error);
        }else{
            res.status(200).send(registeredUser)
        }
    })
})

//login user
router.post('/login', (req,res) => {
    let userData = req.body;
    
    User.findOne({email: userData.email}, (error,user) => {
        if(error){
            console.log(error)
        } else {
            if(!user){
                res.status(401).send('Invalid email address!')
            } else if(user.password !== userData.password){
                res.status(401).send('Invalid Credentials!')
            } else {
                res.status(200).send(user)
            }
        }
    })
})

//Home page
router.get('/home', (req,res) => {
    res.send('Home Page');
})


module.exports = router;