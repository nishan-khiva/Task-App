const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskData = new Schema({
    tittle: {
        type: String,
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
    important:{
        type:Boolean,
        default:false,
    },
    complete:{
        type:Boolean,
        default:false,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: {  
        type: String, 
        ref:'User',
        required: true
    }

});

const TaskDB = mongoose.model('AllTask', TaskData)

module.exports = TaskDB;