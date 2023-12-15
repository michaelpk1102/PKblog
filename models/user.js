const mongoose = require('mongoose');
const validator = require('validator'); 

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true, 
        required: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v); 
            },
            message: props => `${props.value} Is  an invalid email!, Please used correct Email and try again`
        }
    },
    password: String
});

module.exports = mongoose.model("User", userSchema);
