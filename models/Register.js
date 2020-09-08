const mongoose = require('mongoose');

//Schema del Register
const RegisterSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    gender : {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    registration : {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', RegisterSchema);