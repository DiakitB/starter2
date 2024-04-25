const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  /// 1 ) Create a transporter

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  /// step 2)

  const mailOpeions = {
    from: 'Marcus Diakite    <world@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  /// step 3)
  await transporter.sendMail({ mailOpeions });
};
module.exports = sendEmail;
