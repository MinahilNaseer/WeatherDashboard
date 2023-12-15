/*//const express = require('express');

//const app = express();

//app.use(express.static('public'));

//app.listen(3000 ,() => {
  //console.log("Server is running on port 3000");
//})
const express = require('express');
const request = require('request');

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async(req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apikey="094b545dde613af5667ba10639a224f8";

  // Add your logic here to fetch weather data from the API
  const url="https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}";
  // Render the index template with the weather data and error message
  res.render("index", { weather: null, error: null });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});*/
const express = require('express');
const https = require('https');
const path = require('path');
const { response } =require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+"/public/main.html"));
})
app.post('/',(req,res)=>{
  //console.log(req.body.cityName);
  const query = req.body.cityName
  const apiKey = '9a45dc5470304ed7d813a404d98c2758'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=metric'
  https.get(url,(response)=>{
    let data= '';
    response.on('data',(chunk)=>{
      //console.log(data);
      
      //const weatherData = JSON.parse(data);
      //console.log(weatherData);
      //const temp = weatherData.main.temp;
      //console.log(temp);
      data +=chunk;
    })
    response.on('end',()=>{
      const weatherData = JSON.parse(data);
      console.log('Wind Direction:', weatherData.main.temp);
      console.log(weatherData);

      const temp = Math.round(weatherData.main.temp);
      const name = weatherData.name;
      const desc =weatherData.weather[0].description;      const pressure=weatherData.main.pressure;
      const humidity=weatherData.main.humidity;
      const windspeed= weatherData.wind.speed;
      const sunrise = weatherData.sys && weatherData.sys.sunrise !== undefined ? formatTime(weatherData.sys.sunrise) : 'N/A';
      const sunset=weatherData.sys&&weatherData.sys.sunser!==undefined?formatTime(weatherData.sys.sunset):'N/A';
       res.json({
        temp,
        desc,
        name,
        visibility,
        pressure,
        humidity,
        windspeed,
        sunrise,
        });
   
    });

  });
})

app.listen(3000,()=> console.log("our server is running"))