const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import routes
const emailsRoute = require('./routes/emails');


app.use('/email', emailsRoute);

app.get('/', (req, res) => {
    res.send('We are on home.');
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
() => {
    console.log('connected to db');
});

app.listen(3000);