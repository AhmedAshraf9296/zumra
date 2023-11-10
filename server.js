require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userModel')
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require('./routes/userRoute');
const convertRoute = require('./routes/convertRoute')
const mongoUsername = process.env.MONGO_INITDB_ROOT_USERNAME || 'zumra';
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD || 'zumra123';
const mongoHost = process.env.MONGO_HOST || 'mongodbc';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoURI = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;
// const mongoURI = `mongodb://localhost:${mongoPort}`;
// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9avuj.mongodb.net/?retryWrites=true&w=majority`;
console.log(mongoURI)
app.use(bodyParser.json());
app.use('/api',userRoute);
app.use('/api',convertRoute);

mongoose.connect(mongoURI).then((r) => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
