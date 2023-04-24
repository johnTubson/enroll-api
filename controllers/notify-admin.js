"use strict";
const nodemailer = require("nodemailer");

async function sendMail(userDetails) {


  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  // send mail with defined transport object

  let mailOptions = {
    from: '"Site Control" <users@enroll-api.johntubsondev>', // sender address
    to: process.env.ADMIN_EMAIL, // list of receivers
    subject: "New enrolled user", // Subject line
    text:
      "Hello Admin, there's a new enrolled user with the following details: \n " +
      userDetails, // plain text body
    html:
      "<b>Hello Admin</b>, there's a new enrolled user with the following details: \n " +
      userDetails, // html body
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if(err) {
      // do nothing, non-breaking change
    }
  })
}

module.exports = sendMail;
