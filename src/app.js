const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    })
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/help/*', (req, res) => {
    res.send('Help article was not found')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            console.log('Error done')
            return res.send({
                error: error
            })
        }
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must enter a location'
        })
    }
    return res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('404 page')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})