const express = require('express');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const router = express.Router();
require('dotenv/config');

const Email = require('../models/Email');

router.get('/', async (req, res) => {
    try {
        const emails = await Email.find();
        res.json(emails);
    } catch (err) {
        res.json({message: err });
    }
});

router.post('/', async (req, res) => {
    const content = req.body.content;

    const transporter = nodemailer.createTransport({
        host: process.env.BUSINESS_MAIL_HOST,
        port: process.env.BUSINESS_MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.BUSINESS_MAIL_USER,
          pass: process.env.BUSINESS_MAIL_PASS
        }
      });

      console.log(req.body.receiver);

    let message = {
        from: 'Business Bookings App ' + '<' + process.env.BUSINESS_MAIL_USER.toString() + '>',
        //to: req.body.receiver,
        to: process.env.BUSINESS_MAIL_USER, // for testing purposes
        subject: 'Your booking notification ✔',
        text: content,
        html: '<p>' + content + '</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }
    
        console.log('Message sent: %s', info.messageId);
    });

    let bookingDate = new Date(req.body.booking_time).toLocaleString();
    //let threeHoursBeforeBooking = new Date(bookingDate.setHours(bookingDate.getHours() - 3));
    console.log(bookingDate);
    let date = Date.parse(bookingDate);
    let threeHoursBeforeBooking = new Date(new Date(date).setMinutes(new Date(date).getMinutes() - 18)); //when testing
    console.log(threeHoursBeforeBooking.toLocaleString());
 
    const email = new Email({
        receiver: req.body.receiver,
        content: req.body.content,
        date_issued: new Date(),
        booking_time: bookingDate,
        date_sent: new Date(),
    });
    
    
    const savedEmail =  await email.save();
    try {
        res.json(savedEmail);
    } catch (err) {
        res.json({ message: err });
    }


    let remindingMessage = {
        from: 'Business Bookings App ' + '<' + process.env.BUSINESS_MAIL_USER.toString() + '>',
        //to: req.body.receiver,
        to: process.env.BUSINESS_MAIL_USER,
        subject: 'Your booking notification ✔',
        text: req.body.reminderContent,
        html: '<p>' + req.body.reminderContent + '</p>'
    };


    const remindingMessageEmail = new Email({
        receiver: req.body.receiver,
        content: req.body.reminderContent,
        date_issued: new Date(),
        booking_time: bookingDate,
        date_sent: threeHoursBeforeBooking,
    });
    
    const job = schedule.scheduleJob(threeHoursBeforeBooking,  () => {
        console.log("sheduled");

        transporter.sendMail(remindingMessage, async (err, info) => {
            if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
            }
            console.log('Message sent: %s', info.messageId);
            console.log("here");
            const savedEmail =  await remindingMessageEmail.save();
            /*try {
                res.json(savedEmail);
            } catch (err) {
                res.json({ message: err });
            }*/

        });
    });

});

router.get('/:receiver', async (req, res) => {
    const emails = await Email.find({ receiver: req.params.receiver });

    try {
        res.json(emails);
    } catch (err){
        res.json({ message: err });
    }
});

module.exports = router;