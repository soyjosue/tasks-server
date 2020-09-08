const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    isChecked : {
        type : Boolean,
        default : false
    },
    registration : {
        type : Date,
        default : Date.now()
    },
    author : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Tasks', tasksSchema)