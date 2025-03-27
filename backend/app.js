const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const usersRoutes = require('./routes/users');
const addressRoutes = require('./routes/address');

//app init
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // React app URL
    credentials: true,  // Allow sending cookies
}));

// routeMiddleware
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/address', addressRoutes);

module.exports = app;