const mongoose = require('mongoose');

require('./models/user.model');

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

module.exports = { connection, disconnect };
