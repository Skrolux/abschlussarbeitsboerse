const express = require('express');
/* const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swaggerDef'); */
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/entries', require('./routes/api/entries'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/feedback', require('./routes/api/feedback'));

// Homepage at localhost:5200
app.get('/', (req, res) => {
    res.send('Backend Server running.');
});

// Swagger Documentation
/* app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
); */

module.exports = app;