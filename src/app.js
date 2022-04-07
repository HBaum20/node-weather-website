const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harry Baum'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harry Baum'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Harry Baum',
        message: 'I\'m sorry, there\'s nothing we can do to help'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        const response = { error: 'You must provide an address' };
        console.log(response);
        return res.send(response);
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Harry',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'Harry',
        errorMessage: 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});