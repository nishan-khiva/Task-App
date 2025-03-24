const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SignData = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserDB = mongoose.model('AllUser', SignData)
module.exports = UserDB;