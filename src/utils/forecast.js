const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/90e6220adb6811b4442340b6e4433d1a/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', unefined);
        } else if (body.error) {
            // If the error propery exists, we know something has gone wrong.
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.apparentTemperature + " degrees out. The high today is: " + body.daily.data[0].temperatureHigh + ", with a low of: " + body.daily.data[0].temperatureLow + "." + " There is a " + body.currently.precipProbability + "% chance of rain.");
        }
    })
}

module.exports = forecast;