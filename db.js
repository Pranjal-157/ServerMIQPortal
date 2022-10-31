const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DATABASE_URL, connectParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
