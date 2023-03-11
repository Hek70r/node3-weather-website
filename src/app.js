const express = require("express");
const request = require("postman-request");
const path = require('path')
const hbs = require('hbs');

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Setup path for express confings
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsPath)

// Setup static directiory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'WEATHER APP',
    name: 'Andrzej Tatowski'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'ABOUT kurwa ME',
    name: 'Adrew Tatowski'
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  // Szukamy kordów dla podanego w query miejsca
  geocode(req.query.address, (addressError, {latitude, longtitude, location} = {}) => {
      //Gdyby pojawił się jakiś błąd z połączaniem z API geo
      if(addressError) {
        return res.send({
            error: addressError
        })
      }

      // Szukamy pogody dla znalezionych kordów
      forecast(latitude, longtitude, (forecastError, forecastData) => {
        if(forecastError) {
          return res.send({
            error: forecastError
          })
        }

        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        })
      })
    }
  )
});

app.get("/help", (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'HELP', 
    name: 'Andrzej Tatowski'
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrzej Tatowski',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrzej Tatowski',
    errorMessage: 'Page not found'
  })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});