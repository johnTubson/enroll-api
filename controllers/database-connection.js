const mongoose = require("mongoose");

const dbConnection = mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.1riedus.mongodb.net/enrollDB`);

module.exports = dbConnection;
