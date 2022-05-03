const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    receiver: String,
    content: String,
    date_issued: String,
    date_sent: String,
});

module.exports = mongoose.model('Emails', EmailSchema);