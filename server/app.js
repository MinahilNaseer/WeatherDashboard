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
  const data = {
      email: req.body.email,
      password: req.body.password
    }
    //check if user already exists 
    const existingUser = await Registration.findOne({email: data.email});
    if(existingUser)
    {
      console.log("User not registered");
    }
    else{
      //hash password using bycrypt
      if (!data.password) {
          return res.status(400).json({ success: false, message: "Password is required" });
        }
        try {
    const userdata = await Registration.insertMany(data);
   console.log("User sucessfully registered");
    console.log(userdata);
    }catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
}
})

app.post('/login', async (req, res) => {
  try {
    const check = await Registration.findOne({ email: req.body.email });

    if (!check) {
      res.send("Email is not registered");
    } else {
      // Get the entered password from the request body
      const enteredPassword = req.body.password;

      // Compare the entered password with the stored password
      if (enteredPassword === check.password) {
        // Passwords match
        console.log("Logged in");
        res.status(201).json({ success: true, email: check.email });
      } else {
        // Passwords do not match
        console.log("Wrong password");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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