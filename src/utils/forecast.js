const request = require('postman-request');

const forecast = ({ Latitude, Longitude }, callback) => {
  let url = `http://api.weatherstack.com/current?access_key=e3bddab3e02266169155bdb5d371c3d1&query=${encodeURIComponent(
    Latitude
  )},${encodeURIComponent(Longitude)}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service ice', undefined);
    } else if (body.success === false) {
      callback(`${body.error.info}`), undefined;
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees`
      );
    }
  });
};

module.exports = forecast;
