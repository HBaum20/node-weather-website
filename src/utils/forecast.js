const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=652b40c34bafa525a0892d2f6865a150&query=${lat},${lng}`;
    request(url, { json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('Unable to find weather', undefined);
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. Wind speed is ${body.current.wind_speed}mph.`
            );
        }
    });
}

module.exports = forecast;