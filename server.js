// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./app/routes/userRoutes');
const candidatesRoutes = require('./app/routes/candidatesRoutes');

const { Sequelize } = require('sequelize');
const userModel = require('./app/models/userModel');
const candidatesModel = require('./app/models/candidatesModel');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database successfully.');
    } catch (error) {
        // console.error('Unable to connect to the database:', error);
    }
})();

// Load models
const User = userModel(sequelize, Sequelize);
const Candidates = candidatesModel(sequelize, Sequelize);

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Models synced with the database.');
});

// Routes
app.use('/users', userRoutes(User));
app.use('/candidates', candidatesRoutes(Candidates));

// Export the app object
module.exports = app;

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

