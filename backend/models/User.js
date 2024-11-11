const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    address:{
        type: String,
        required: false,
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})



const User = mongoose.model('User', userSchema);
module.exports = User;