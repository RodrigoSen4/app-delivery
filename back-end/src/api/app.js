const cors = require('cors');
const express = require('express');
const productRoute = require('./routes/products.route');
const loginRoute = require('./routes/login.route');
const saleRoute = require('./routes/sale.route');
const userRoute = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoute);
app.use(saleRoute);
app.use(loginRoute);
app.use(userRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

// Branch Release
