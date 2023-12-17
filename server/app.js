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
  const { cityName, lat, lon } = req.body;
  let query;

  if (cityName) {
      query = cityName;
      const apiKey = '9a45dc5470304ed7d813a404d98c2758';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
          data += chunk;
          //const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      const icon = weather.weather[0].icon;
      console.log(icon);
      });
      response.on('end', () => {
          try {
              const weatherData = JSON.parse(data);
              if(response.statusCode === 200){
                const temp = weatherData.main.temp;
              const name = weatherData.name;
              const desc = weatherData.weather[0].description;
              const press = weatherData.main.pressure;
              const icon = weatherData.weather[0].icon;
              res.json({
                  temp,
                  desc,
                  name,
                  press,
                  icon
              });
              }else {
                // If the required properties are not present, handle the error
                console.error('Error: Unexpected response from OpenWeatherMap API');
                    console.error('Status Code:', response.statusCode);
                    console.error('Response:', data);
                    res.status(response.statusCode || 500).json({ error: 'Internal Server Error' });
            }
          } catch (error) {
              console.error('Error parsing weather data:', error);
              res.status(500).json({ error: 'Internal Server Error' });
          }
      });
  });
  } else if (lat && lon) {
    
    const latitude = lat; // Replace with the actual latitude
    const longitude = lon;
    //query = `lat=${lat}&lon=${lon}`;
    const lang = 'en';
    const apiKey1 = '9a45dc5470304ed7d813a404d98c2758';
    const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey1}&lang=${lang}`;
    https.get(url1, (response) => {
      let data = '';
      response.on('data', (chunk) => {
          data += chunk;
          const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log(temp);
      });
      response.on('end', () => {
          try {
              const weatherData = JSON.parse(data);
              if(response.statusCode === 200){
                const temp = weatherData.main.temp;
              const name = weatherData.name;
              const desc = weatherData.weather[0].description;
              res.json({
                  temp,
                  desc,
                  name
              });
              }else {
                // If the required properties are not present, handle the error
                console.error('Error: Unexpected response from OpenWeatherMap API');
                    console.error('Status Code:', response.statusCode);
                    console.error('Response:', data);
                    res.status(response.statusCode || 500).json({ error: 'Internal Server Error' });
            }
          } catch (error) {
              console.error('Error parsing weather data:', error);
              res.status(500).json({ error: 'Internal Server Error' });
          }
      });
  });
  } else {
      res.status(400).json({ error: 'City name or geolocation is required.' });
      return; // Add a return statement to exit the function here
  }
=======
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
      const desc =weatherData.weather[0].description;      
      const pressure=weatherData.main.pressure;
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