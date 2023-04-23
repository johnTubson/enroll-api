const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


async function sendMail (userDetails) {

const msg = {
  to: userDetails.email,
  from: process.env.ADMIN_EMAIL,
  subject: 'New enrolled user',
  text: 'Hello Admin, there\'s a new enrolled user with the following details: \n ' + userDetails,
  html: '<b>Hello Admin</b>, there\'s a new enrolled user with the following details: \n ' + userDetails,
};


  try {
    await sgMail.send(msg);
  } catch (error) {
    return;
  }
};




module.exports = sendMail;