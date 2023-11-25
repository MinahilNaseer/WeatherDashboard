//const express = require('express');

//const app = express();

//app.use(express.static('public'));

//app.listen(3000 ,() => {
  //  console.log("Server is running on port 3000");
//})
const express = require("express");
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
});