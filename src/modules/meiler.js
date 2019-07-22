const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });

  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/auth'),
    extName : '.html'
  }));

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //          user: 'youremail@address.com',
  //          pass: 'yourpassword'
  //      }
  //  });

  //  const mailOptions = {
  //   from: 'sender@email.com', // sender address
  //   to: 'to@email.com', // list of receivers
  //   subject: 'Subject of your email', // Subject line
  //   html: '<p>Your html here</p>'// plain text body
  // };

  module.exports = transport;