const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { string } = require("joi");
dotenv.config();

// sending Email
// const sendEmail = async(otp) => {
// try{
//   const apiKey = process.env.APIKEY;
//   const domain = process.env.DOMAIN;

// const mailgun = require('mailgun-js')({ domain, apiKey });

// await mailgun.
//   messages().
//   send({
//     from: `test@${domain}`,
//     to: 'richardselvaraj07@gmail.com',
//     subject: 'Verification',
//     html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup
//     <p>This code will <b>expires in 1hour</b></p>`,
//   })
// }catch(error){
//   console.log(error)
//   ({message: 'Error Occurred in Mail Generator'})
// }
// }

//register user
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) return res.status(400).send({ message: error });
    // console.log(error);

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      ...req.body,
      password: hashPassword,
      verified: false,
    });
    user
      .save()
      .then((registerUser) => {
        const token = registerUser.generateAuthToken();
        return res
          .status(200)
          .send({ data1: token, message: "Registered user successful" });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: `Registeration Unsuccessfully` });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//Send otp verification email
// const sendOtpVerificationEmail = async ({_id, email}, res) => {
//   try{
//      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//      console.log(otp)

//    //hash the otp
//    const salt = await bcrypt.genSalt(Number(process.env.SALT));
//    const hashedOTP = await bcrypt.hash(otp, salt)

//    const newOTPVerification = await new UserOTPVerification({
//     userId: _id,
//     otp: hashedOTP,
//     createdAt: Date.now(),
//     expiresAt: Date.now() + 3600000,
//    });

//    //Save in database
//    await newOTPVerification.save();
//    await sendEmail(otp)

//   } catch(error){
//     ({ message: "Internal server error" });
//   }
// }

module.exports = router;
