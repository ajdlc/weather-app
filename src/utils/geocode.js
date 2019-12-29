// Require request
const request = require('request');

const geocode = (address, callback) => {
    // We are using encodeURIComponent in order to convert special characters to the proper URI format. Such as " " to %20
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWpkbGMiLCJhIjoiY2szOXFzdjFiMDV6ejNvbGtocWNyZWRqZiJ9.VZE8FhuS1nlViamFy31rvQ&limit=1";

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to network services.', undefined);
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try again with another address.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

// Export it out
module.exports = geocode;