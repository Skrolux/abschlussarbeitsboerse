const mongoose = require("mongoose");

// bei direkten Verbidungen zwischen Docker-Containern immer Containername als Hostname verwenden
// const DB_URI = "mongodb://mongo:27017/main_database";

const DB_URI = "mongodb+srv://evaluation:5YT32iA74bgH6zn@cluster0.7sfmj.mongodb.net/main_database?retryWrites=true&w=majority"

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
