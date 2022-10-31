const express = require('express');
require("dotenv").config();
const app = express();
const connection = require('./db');
const dotenv = require("dotenv");
const cors = require('cors');
const details = require('./routes/details');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');



dotenv.config();

//database connection 
connection();


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
/* To Register the User*/
app.use("/api/users", userRoutes);
/* To Login the User*/
app.use("/api/auth", authRoutes);
/* To Check the UserName is available*/
app.use("/", authRoutes);
/* To Fetch,Post,Put,Delete*/
app.use("/details", details);


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`The Port is running on localhost: ${port}`)
})
