const express = require('express');
const productRoute = require('./routes/products.route');
const saleRoute = require('./routes/sale.route');

const app = express();

app.use(express.json());

app.use(productRoute);
app.use(saleRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

// Branch Release
