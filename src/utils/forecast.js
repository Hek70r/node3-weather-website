const request = require('postman-request')


// function that takes coordinates and callback, and try to get weather from this place, handling errors
const forecast = (latitude, longtitude, callback) => {
    const forecastURl = 'http://api.weatherstack.com/current?access_key=556cea573192e32b8dbd635d814c062a&query=' 
    + latitude + ',' + longtitude +'&units=m'

    request({url: forecastURl, json: true}, (error, response) => {
        if(error) {
            callback('Uanble to connect to weathercast services!', undefined)
        }
        else if (response.body.error) {
            callback('Unable to find this location. Try another search!', undefined)
        }
        else {
            callback(undefined,
                response.body.current.weather_descriptions[0] + ':\tIt is currently ' + response.body.current.temperature
                + ' degrees out.' + '\tIt feels like ' + response.body.current.feelslike + ' degrees out'
            )
        }
    })

}

module.exports = forecast