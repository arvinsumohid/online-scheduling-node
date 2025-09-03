const mongoose = require('mongoose');

// sync indexes, instead of calling from model so that it will not warning in test
// Jest did not exit one second after the test run has completed.
const syncIndexes = async () => {
  const User = require('./models/user.model');

  User.syncIndexes().catch(error => console.error(error));
};

const connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/online-scheduling');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

module.exports = { connection, disconnect, syncIndexes };
