const cors = require('cors');
const express = require('express');
const productRoute = require('./routes/products.route');

const app = express();

app.use(cors());

app.use(productRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

// Branch Release
