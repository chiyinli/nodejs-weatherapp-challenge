const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');
const response = require('express');

//Starting Express
const app = express();

//Defining Public Directory
const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');
app.use(express.static(publicDirectory));
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Defining Routes
app.get("/", (req, res) => {
    res.render('index');
    
});

app.post('/api/weather', (req, res) => {
    
    console.log(req.body.weather);

    const city = req.body.cityName;
    const countrys = req.body.country;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f91cccea650ab22d52cc5985574896b3`;
    //console.log(weatherUrl);
    console.log(req.body.weather);
    

    
    request({ url: weatherUrl, json: true}, (error, response) => {

        // console.log(response.body);

        console.log(error);

        if(response.body.error){ //display error
            res.render('index', {
                weather: "Sorry that option isn't available"
            })
        } else {
            res.render('index', { // display information from api
                weather: response.body.main.temp,
                pressure: response.body.main.pressure,
                tempMin: response.body.main.temp_min,
                tempMax: response.body.main.temp_max,
                humidity: response.body.main.humidity,
                icon: response.body.icon,
                descriptions: response.body.weather.description
            })
        }
    })
});


app.listen(5000, () => { // use port 5000 to host the local server
    console.log("server is running on port 5000");
});