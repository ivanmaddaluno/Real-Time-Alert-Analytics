const express = require("express");
const sendToMeRouter = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD,
    },
};

const transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
    if (error) {
        console.error(error);
    } else {
        console.log("users ready to mail");
    }
});

sendToMeRouter.post("/", (req, res, next) => {
    //make mailable object
    const mail = {
        from: process.env.THE_EMAIL,
        to: "ivan.maddaluno@scout24.com",
        subject: req.body.subject,
        text: `
from:
${req.body.name} 

contact: ${req.body.email}

message: 

${req.body.text}`,
    };
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: "fail",
            });
        } else {
            res.json({
                status: "success",
            });
        }
    });
});

module.exports = sendToMeRouter;
