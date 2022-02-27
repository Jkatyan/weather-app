const express = require('express')
var request = require('request')
const app = express()
const apiPort = 3000

const apiKey = 'a69a12410c5c4afe27ab1395d005f0be'

function getFahrenheit(temp) {
    return 1.8 * (temp - 273.15) + 32;
}

function getCelsius(temp) {
    return temp - 273.15;
}

app.get('/', (req, res) => {
    res.send('Please specify a location.')
})

app.get('/locations', (req, res) => {
    res.send('Please specify a location.')
})

app.get('/locations/:zipcode/:scale?', (req, res) => {
    request(
        "https://api.openweathermap.org/data/2.5/weather?zip=" + req.params.zipcode + ",us&appid=" + apiKey,
        function(error, response, body) {
            if(!error && response.statusCode == 200) {
                var responseData = JSON.parse(body);
                var temp = responseData.main.temp;
                var scale = 'Fahrenheit';
                if (req.params.scale) {
                    if (req.params.scale === 'celsius'){
                        scale = 'Celsius';
                        temp = getCelsius(temp);
                        return res.send({temp, scale});
                    }
                    temp = getFahrenheit(temperature);
                    return res.send({temp, scale});
                }
                else {
                    temp = getFahrenheit(temp)
                    return res.send({temp, scale})
                }
            }
            else {
                return res.send('Please enter a valid Zip Code.');
            }
        })
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))