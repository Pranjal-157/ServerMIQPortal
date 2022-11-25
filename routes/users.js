const router = require("express").Router();
const { User, validate } = require("../models/user");
const { UserOTPVerification } = require('../models/userOTPVerification')
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { string } = require("joi");
dotenv.config();

//Nodemailer 
// let transporter = nodemailer.createTransport({
//   host: "smtp-mail.mirafra.com",
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   },
// })




//register user
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
    return res.status(400).send({ message: error.details[0].message });
    console.log(error);

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword, verified: false });
    user
      .save()
      .then((registerUser) => {
        const token = registerUser.generateAuthToken();
        const id = registerUser._id;
        const email = registerUser.email; 
        return res
          .status(200)
          .send({data: token,  message: `Registeration Successful`})
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: `Registeration Unsuccessfully`});
      });
      
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});


// // //Send otp verification email
// const sendOtpVerificationEmail = async ({_id, email}, res) => {
//   try{
//      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     console.log(otp)
//      //mail options
//      const mailOptions = {
//         from: process.env.AUTH_EMAIL,
//         to: email,
//         subject: "Verify Your Email",
//         html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup 
//         <p>This code will <b>expires in 1hour</b></p>`,
//      };

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
//    await transporter.sendMail(mailOptions);
//    res.status(202).send({
//     message: "Verification otp email sent",
//     data: {
//       userId: _id,
//       email,
//     }
//    })
//   } catch(error){
//     console.log(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// }



module.exports = router;
