const express = require('express');
const connectDb = require("./config/db")
const bodyParser = require("body-parser")

const userRoutes = require('./routes/userRoutes');
const distanceRoutes = require('./routes/distanceRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

//Connect to the Database
connectDb();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api', userRoutes);
app.use('/api', distanceRoutes);
app.use('/api', authRoutes);

const port = process.env.PORT || 4000

app.listen(port, ()=> {
    console.log(`Server is listening on the port: ${port}`);
})

