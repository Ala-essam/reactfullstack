const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/current-weather', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: '53.1,-0.13' },
      headers: {
        'X-RapidAPI-Key': '19376cc1a6msh07c3b09350a93fbp129c44jsncbcdcfcdac02',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const weatherData = response.data;

    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
