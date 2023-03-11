const request = require('postman-request')

// function that from the argument 'address' get the location and its coordinates from API, and "returns" it as a callback functions
// which handles errors as well
 
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) 
    + '.json?access_token=pk.eyJ1IjoiZmVuaXhlcnJvIiwiYSI6ImNsZXEybWQyMzBlZjQ0OXAyYjY0djUwdXgifQ.4tdmrgD7s2uOWNTYmAQDpQ&limit=1'
     
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined) // używamy callbacku z errorem jeśli taki jest, a domyśnie drugi arg to undefined
        } 
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode