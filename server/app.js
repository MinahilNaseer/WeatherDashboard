const express = require('express');
const https = require('https');
const path = require('path');
const mongoose = require("mongoose");
const dotenv=require("dotenv");

const { response } = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

const Registration = require("./config");

const app = express();
dotenv.config();

app.set('view engine','ejs');

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/main.html'));
    res.render("main");
});

app.post('/register',async(req,res)=>{
  console.log("Request Body:", req.body);
const data = {
    email: req.body.email,
    password: req.body.password
  }
  //check if user already exists
  
  try{ 
      console.log("Querying for email:", data.email);
  const existingUser = await Registration.findOne({email: data.email});
  console.log("Querying for email:", data.email);
  console.log("Existing User:", existingUser);
  if(existingUser !== null)
  {
      console.log("User already registered");
      res.send("User already registered");
      
    
  }else{      
      const userdata = await Registration.insertMany([data]);
      res.send("Successfully registered");
      console.log("Successfully registered");
      
      console.log(userdata);
  }
    
}catch (error) {
  console.error("Error in user registration:", error);
  res.status(500).send("Internal Server Error");
}
})

app.post('/login', async (req, res) => {
  try {
    const check = await Registration.findOne({ email: req.body.email });
    if (check) 
    {
      res.send("Email is not registered");
      enteredPassword=req.body.password;
      if (enteredPassword === check.password) 
      {
        res.send("Logged in")
        console.log("Logged in");
      }
      else 
      {
        console.log("Wrong password");
      }
    } 
    else 
    {
      console.log("Email is not registered");
      res.status(201).json({ success: false, message: "Email is not registered" });
    }
  } 
  catch (error) 
  {
    console.error(error);
  }
});

app.post('/', (req, res) => {
  try {
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
              });
              response.on('end', () => {
                  handleResponse(data, res);
              });
          });
      } else if (lat && lon) {
          const latitude = lat;
          const longitude = lon;
          const lang = 'en';
          const apiKey1 = '9a45dc5470304ed7d813a404d98c2758';
          const url1 =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey1}&lang=${lang}&units=metric`;

          https.get(url1, (response) => {
              let data = '';
              response.on('data', (chunk) => {
                  data += chunk;
              });
              response.on('end', () => {
                  handleResponse(data, res);
              });
          });
      } else {
          throw new Error('City name or geolocation is required.');
      }
  } catch (error) {
      console.error('Error:', error.message);
      res.status(400).json({ error: error.message });
  } finally {
    

  }
});

function handleResponse(data, res) {
  try {
      const weatherData = JSON.parse(data);
      const cod = weatherData.cod;
      if (weatherData.cod === 200) {
          const temp = weatherData.main.temp;
          const name = weatherData.name;
          const desc = weatherData.weather[0].description;
          const pressure=weatherData.main.pressure;
          const humidity=weatherData.main.humidity;
          const windspeed= weatherData.wind.speed;
          const feels_like=weatherData.main.feels_like;
          var icon = weatherData.weather[0].icon
          res.json({
              temp,
              desc,
              name,
              pressure,
              humidity,
              windspeed,
              feels_like,
              icon
          });
      } else {
          throw new Error('Unexpected response from OpenWeatherMap API. Status Code: '+cod);
      }
  } catch (error) {
      console.error('Error parsing weather data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

app.listen(port,()=> console.log("our server is running"))