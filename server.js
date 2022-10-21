const express = require('express');
require("dotenv").config();
const app = express();
const connection = require('./db');
const dotenv = require("dotenv");
const cors = require('cors');
const details = require('./routes/details')
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


dotenv.config({path:__dirname+'/.env'});

//database connection 
connection();


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/details", details)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`The Port is running on localhost: ${port}`)
})
