const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/42910af8bdbb27d4ee0aaa82652faa65/' + latitude + ',' + longitude + '?units=si&lang=ru'

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, {temperature: response.body.currently.temperature, forecast: response.body.daily.data[0].summary, rain: response.body.currently.precipProbability})
        }
    })
}

module.exports = forecast