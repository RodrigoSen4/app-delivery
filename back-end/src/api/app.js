const express = require('express');
const productRoute = require('./routes/products.route');
const loginRoute = require('./routes/login.route');

const app = express();
app.use(express.json());

app.use(productRoute);
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(loginRoute);

module.exports = app;

// Branch Release
