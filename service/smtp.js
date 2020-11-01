const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const env = require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.RECEIVER_EMAIL,
    pass: process.env.RECEIVER_EMAIL_PASSWORD,
  },
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Nodemailer",
    link: "http://localhost:3000/",
  },
});

const sendMail = (req, res) => {
  let response = {
    body: {
      name: `${req.body.credentials}`,
      intro: `Моб.Телефон: ${req.body.phone}`,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.RECEIVER_EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: "Новое скачивание",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

module.exports = {
  sendMail,
};
