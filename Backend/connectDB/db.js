const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
      family:             4,       // prefer IPv4
      connectTimeoutMS:   10000,   // initial connection socket timeout
      serverSelectionTimeoutMS: 10000, // reduce waiting time for server selection
      socketTimeoutMS:    45000,   // socket inactivity timeout
    });
    console.log('Database Connected...');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
