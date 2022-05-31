const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createLearnDotConnectionPool, createELearningConnectionPool } = require('./src/dbConnector');
const indexRouter = require('./src/api/index/index.router')
require('dotenv').config();
const path = require('path');

const app = express();
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above

// Using Routes ==========================================
app.use('/api', indexRouter)

app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}...`);
  createLearnDotConnectionPool();
  createELearningConnectionPool();
});