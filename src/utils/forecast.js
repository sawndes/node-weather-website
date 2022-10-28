const request = require('request') 
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8a3d4646255b5c21fbdedd09ac07a2b0&query='+lat+','+long+'&units=f '
    request ({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0]+". It is current "+ body.current.temperature+" degrees out. There is "+body.current.precip+"% chance of rain")
        }
    
    })  
}

module.exports = forecast