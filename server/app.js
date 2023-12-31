  const express = require('express');
  const https = require('https');
  const path = require('path');
  const { response } = require('express');
  const bodyParser = require('body-parser');

  const app = express();
  app.use(bodyParser.urlencoded({extended:true}));

  app.use(express.static(path.join(__dirname, 'public')));
  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+"/public/main.html"));
  })
  app.post('/',(req,res)=>{

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
            try {
                const weatherData = JSON.parse(data);
                if(response.statusCode === 200){
                  const temp = weatherData.main.temp;
                const name = weatherData.name;
                const desc = weatherData.weather[0].description;
                const pressure=weatherData.main.pressure;
                const humidity=weatherData.main.humidity;
                const windspeed= weatherData.wind.speed;
                const feels_like=weatherData.main.feels_like;
                const icon = weatherData.weather[0].icon;
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
    } else if (lat && lon) 
    {
      

      //const weatherData = JSON.parse(data);
      //console.log(weatherData);
      //const temp = weatherData.main.temp;
      //console.log(temp);
      data +=chunk;
    })
    response.on('end',()=>{
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = Math.round(weatherData.main.temp);
      const name = weatherData.name;
      const desc =weatherData.weather[0].description;     
       const pressure=weatherData.main.pressure;
      const humidity=weatherData.main.humidity;
      const windspeed= weatherData.wind.speed;
     const feels_like=weatherData.main.feels_like;
       res.json({
        temp,
        desc,
        name,
        pressure,
        humidity,
        windspeed,
        feels_like

      const latitude = lat; // Replace with the actual latitude
      const longitude = lon;
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
                const pressure=weatherData.main.pressure;
                const humidity=weatherData.main.humidity;
                const windspeed= weatherData.wind.speed;
                const feels_like=weatherData.main.feels_like;
                const icon = weatherData.weather[0].icon;
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

});
});
app.listen(3000, () => console.log("Our server is running"));

  }
  else 
    {
        res.status(400).json({ error: 'City name or geolocation is required.' });
        return; // Add a return statement to exit the function here
    }
  })

  app.listen(3000,()=> console.log("our server is running"))

