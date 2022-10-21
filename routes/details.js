const router = require("express").Router();
const jwt = require('jsonwebtoken');
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');


//Details page
router.get('/', (req,res) => {
   res.send([
    {

        title: 'what is typescript?',
  
        description: 'what is typescript?',
  
        technology: 'Angular',
  
        creationDate: '1658799999929',
  
        experience: '2-4 Years',
  
        code: null,
  
        client: 'Cisco',
  
      },
  
      {
  
        title: 'explain about javascript closures?',
  
        description: '',
  
        technology: 'Javascript',
  
        creationDate: '1665722294804',
  
        experience: '2-4 Years',
  
        code: null,
  
        client: 'Samsung',
  
      },
  
      {
  
        title: 'what is DI?',
  
        description: 'what is dependency injection?',
  
        technology: 'Angular',
  
        creationDate: '1590319189931',
  
        experience: '6+ Years',
  
        code: null,
  
        client: 'Digit',
  
      },
  
      {
  
        title: 'explain about angular interpolation?',
  
        description: 'what is interpolation?',
  
        technology: 'Angular',
  
        creationDate: '1648799999929',
  
        experience: '4-6 Years',
  
        code: null,
  
        client: 'Cisco',
  
      },
   ]) 
})



//Home page
router.get('/home', (req,res) => {
    res.send('Home Page');
});

module.exports = router;