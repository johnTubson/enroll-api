const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    choiceOne: {
        type: String,
        required: true,
    },
    choiceTwo: {
        type: String,
        required: true,
    },
    preferredCity: {
        type: String,
        required: true,
    },
    fullSponsorship: {
        type: String,
        required: true,
    },
    marketingConsent: {
        type: String,
        required: true,
    },
    token: String,
    active: Boolean,  
});

const User = mongoose.model("user", userSchema);

module.exports = User;