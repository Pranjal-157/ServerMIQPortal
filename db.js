const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:__dirname+'/.env'});


module.exports = () => {
  const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try{
    mongoose.connect(process.env.DB, connectParams)
    console.log('Connected to database successfully')
  } catch(error){
    console.log(error);
    console.log("could not connect to database");
  }
};


