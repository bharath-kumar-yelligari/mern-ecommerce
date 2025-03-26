const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const mongoose = require('mongoose');

const password = encodeURIComponent(process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    password
);

const connectToDB = async () => {
    try {
        const conn = await mongoose
            .connect(DB, {
                useNewUrlParser: true,
            })

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectToDB;