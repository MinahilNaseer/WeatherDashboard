var today=new Date();
var day=today.getDay();
var daylist=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
document.querySelector(".day").innerHTML=daylist[day]
console.log(daylist[day]);

const year = today.getFullYear();
const month = today.getMonth() + 1; // Months are zero-based, so add 1
const date = today.getDate();
const current  = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
document.getElementById('date').textContent = current;
console.log(current);

$(document).ready(function(){
    function getWeather(cityName){
        $.post('/',{cityName},function(data){
            console.log(data);
            $('#weather-temp').text(data.temp+'°C');
            $('#weather-desc').text(data.desc);
            $('#name').text(data.name);
            
        });
    }
    function getWeatherByLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const { latitude, longitude } = position.coords;
                const roundedLatitude = latitude.toFixed(4);
                const roundedLongitude = longitude.toFixed(4);
                console.log('Latitude:', roundedLatitude);
                console.log('Longitude:', roundedLongitude);
                $.post('/', { lat: latitude, lon: longitude }, function(data) {
                    console.log(data);
                    $('#weather-temp').text(data.temp + '°C');
                    $('#weather-desc').text(data.desc);
                    $('#name').text(data.name);
                });
            }, function(error) {
                console.error('Error getting geolocation:', error);
            });
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }

    $('#weatherForm').submit(function (e){
        e.preventDefault();
        const cityName = $('#CityInput').val();
        getWeather(cityName);
    });
    $('#getLocationBtn').click(function() {
        getWeatherByLocation();
    });

});
    