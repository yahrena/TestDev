const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const sequelize = require('./config/database');
const User = require('./models/User');
const Task = require('./models/Task');
require('dotenv').config();

const app = express();
// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Adresse de votre front-end
  credentials: true // Ceci est nécessaire pour envoyer les cookies
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(session({
  secret: '314070dbc31ec67b8d63bed7292d8cdb', // Remplacez par une clé secrète pour signer les sessions
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Assurez-vous d'utiliser secure: true en production avec HTTPS
}));

app.use('/users', require('./routes/userRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/auth', require('./routes/authRoutes'));

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
