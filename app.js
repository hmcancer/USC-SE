const express = require('express');
const cors = require('cors');
const path = require('path');

const appRouter = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'views', 'build')));

// Router middleware
app.use('/api', appRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'views', 'build', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);

  res
    .status(err.statusCode || 500)
    .json({ success: false, msg: err.message, details: err.details });
});

module.exports = app;
