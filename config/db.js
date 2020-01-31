const mongoose = require('mongoose');

const keys = require('./keys');

mongoose.set('useCreateIndex', true);

// Connect to mongo host, set retry on initial fail
const connectMongo = async () => {
  try {
    await mongoose.connect(keys.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongoose connected');
  } catch (error) {
    console.log(`Mongoose connection error: ${error}`);
    setTimeout(connectMongo, 4000);
  }
};

module.exports = { connectMongo };
