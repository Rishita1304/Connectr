const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
        validation: /^[A-Za-z\d]{8,20}$/
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
        validation: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type:String,
        require: true,
        // validation: /^[A-Za-z\d@$!%*?&]{8,20}$/    ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$
    },
    profilePic: {
        type:String,
        default: "",
    },
    coverPic: {
        type:String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
      desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: String,
      },
},
{timestamps: true}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;