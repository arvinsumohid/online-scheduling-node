const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/online-scheduling');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = { connection };
