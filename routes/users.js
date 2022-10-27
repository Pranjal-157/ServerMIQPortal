const router = require("express").Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
dotenv.config();



//register user
router.post('/', async (req,res) => {

    try{
       const {error} = validate(req.body);

       if(error)
       return res.status(400).send({message: error.details[0].message})

       let user = await User.findOne({email: req.body.email})

       if(user)
        return res.status(409).send({message: "User with given email already exists!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({...req.body, password: hashPassword})
        user.save((error, registerUser) => {

            const token = registerUser.generateAuthToken();
            res.status(200).send({ data: token, message: "Registered Successfully" })
        })    
    
    } catch(error){
        res.status(500).send({message: "Internal server error"})
    }

})

module.exports = router;