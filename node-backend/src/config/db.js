const mongoose = require("mongoose");

const DB_URI = "mongodb://localhost:27017/main_database";

const connectDB = async () => {
  try {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect(DB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Connection error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
