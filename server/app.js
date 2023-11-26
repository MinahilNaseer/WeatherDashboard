//const express = require('express');

//const app = express();

//app.use(express.static('public'));

//app.listen(3000 ,() => {
  //console.log("Server is running on port 3000");
//})
const express = require('express');
const request = require('request');

const app = express();

app.get('/forecast', (req, res) => {
	let city = req.query.city;
	var request = require('request');
	request(
		`https://samples.openweathermap.org/data/2.5/forecast?q=${city}&appid=193ab6f4762de43d221a6c2ab3e315eb`,
		function(error, response, body) {
			let data = JSON.parse(body);
			if (response.statusCode === 200) {
				res.send(`The weather in your city "${city}" is ${data.list[0].weather[0].description}`);
			}
		}
	);
});

app.listen(3000, () => console.log('Server started on port 3000'));