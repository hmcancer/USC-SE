const http = require('http');

const app = require('./app');
const keys = require('./config/keys');
const { connectMongo } = require('./config/db');

const server = http.createServer(app);

connectMongo();

server.listen(keys.port, () =>
  console.log(`Server listening on port ${keys.port}`)
);
