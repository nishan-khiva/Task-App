const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Mongo db is connnected');
    }).catch((err) => {
        console.log('Mongo db is not connected', err);
    })