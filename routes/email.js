// const nodemailer = require("nodemailer");
// const transport = nodemailer.createTransport({
//   host: "smtp.mailgun.org",
//   service: "Mailgun",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "postmaster@sandbox5327ddf44e114005b1c4cdaf131936eb.mailgun.org",
//     pass: "d9e6d0e4c741325b43cba5e5a491aa21-f2340574-26e5c77a",
//   },
// });
// const mailOptions = {
//   from: "postmaster@sandbox5327ddf44e114005b1c4cdaf131936eb.mailgun.org",
//   to: "akash950430@gmail.com",
//   subject: "hello world!",
//   text: "Testing some Mailgun awesomness",
//   html: `<b>Hey there! </b>
//   <br> This is our first message sent with Nodemailer<br/>`,
// };
// transport.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(`Message sent: ${info.response}`);
// });
