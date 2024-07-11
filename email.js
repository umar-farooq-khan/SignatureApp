var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'nondisclousure@clearip.ai',
    pass: 'Whatsappnigga93909390'
  }
});

var mailOptions = {
  from: 'nondisclosure@clearip.ai',
  to: 'umar.farooq407@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});