const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
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
    preferred_choice_one: {
        type: String,
        required: true,
    },
    preferred_choice_two: {
        type: String,
        required: true,
    },
    preferred_city: {
        type: String,
        required: true,
    },
    full_sponsorship: {
        type: String,
        required: true,
    },
    marketing_consent: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;