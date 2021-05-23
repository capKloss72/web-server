const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const hbsTemplatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// HBS engine and views locations
app.set('view engine', 'hbs');
app.set('views', hbsTemplatePath);
hbs.registerPartials(partialsPath);

// Path to static / public assets
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tym Zon',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me!',
    name: 'Tym Zon',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help!',
    message: 'Example message!',
    name: 'Tym Zon',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide a valid address!' });
  }

  geocode(req.query.address, (error, geocodeData) => {
    if (error) {
      return res.send({ error });
    }
    forecast(geocodeData, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send([
        {
          location: geocodeData.Location,
          forecast: forecastData,
          address: req.query.address,
        },
      ]);
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search query!' });
  }

  console.log(req.query.search);
  res.send({ products: [req.query.search] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Tym Zon',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Tym Zon',
  });
});

// app.com
// app.com/help
// app.com/about
// app.com/weather

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
