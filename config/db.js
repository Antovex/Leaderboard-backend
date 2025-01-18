const mongoose = require('mongoose');
require("dotenv").config();


const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.log("DB Error: ", e);
        process.exit(1)
    }
};

module.exports = connectDB;