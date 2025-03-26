// server.js
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const AppError = require('./appError');
const app = require('./app');
const connectToDB = require('./database/db');

// Connect to MongoDB
connectToDB();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
