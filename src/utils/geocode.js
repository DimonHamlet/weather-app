const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=address&access_token=pk.eyJ1IjoiZGltb24taGFtbGV0IiwiYSI6ImNrNXV6bjh2eTFheDUzbm1sdzdpNWtwb2MifQ.0K4xqFzBy8RcPwdD1Og6ow&limit=1&lang=ru'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        }
        else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude : response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode