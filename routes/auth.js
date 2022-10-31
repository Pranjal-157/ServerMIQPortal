const router = require("express").Router();
const bodyParser = require("body-parser");
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

//UserName is available in db
router.get("/validateUserName/:userName", async (req, res) => {
  try {
    let userName = req.params.userName;
    const user = User.findOne({ userName: userName }).then((data) => {
      res.status(200).send(!!data);
    });
    if (!user) return res.status(401).send(!data);
  } catch (error) {
    res.status(500).send({ message: `Internal server error with ${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ userName: req.body.userName }).then(
      (data) => {
        return data;
      }
    );
    if (!user)
      return res.status(401).send({ message: "Invalid username or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in Successfully" });
  } catch (error) {
    res.status(500).send({ message: `Internal server error with ${error}` });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
