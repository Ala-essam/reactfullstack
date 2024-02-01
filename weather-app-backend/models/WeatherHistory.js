const mongoose = require('mongoose');

const weatherHistorySchema = new mongoose.Schema({
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const WeatherHistory = mongoose.model('WeatherHistory', weatherHistorySchema);

module.exports = WeatherHistory;
