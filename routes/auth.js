const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ userName: req.body.userName })
    .then(data =>{
        return data;
    });
    if (!user) return res.status(401).send({ message: "Invalid username or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send({ message: `Internal server error with ${error}` });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    // email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    userName :  Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
