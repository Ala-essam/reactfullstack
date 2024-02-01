const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const weatherRoute = require('./routes/weather');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');

app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);


// Start the server
const PORT = process.env.PORT || 3000 ;


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});