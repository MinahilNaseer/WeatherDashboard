var today=new Date();
// for day
var day=today.getDay();
var daylist=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.querySelector(".day").innerHTML=daylist[day]
console.log(daylist[day]);
// for date
const year = today.getFullYear();
const month = today.getMonth() + 1; 
const date = today.getDate();
const current  = `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}`;
document.getElementById('date').textContent = current;
console.log(current);



// for city and temprature
$(document).ready(function(){
    function getWeather(cityName){
        $.post('/',{cityName},function(data){
            console.log(data);

           $('#weather-temp').text(data.temp+'C');
           $('#weather-desc').text(data.desc);

            $('#weather-temp').text(data.temp+'°C');
            $('#weather-desc').text(data.desc);

            $('#name').text(data.name);
            $('#windspeed').text(data.windspeed+'Km/h');  
            $('#humidity').text(data.humidity+'%');
            $('#pressure').text(data.pressure+'bpa');
            $('#feels_like').text(data.feels_like+'C');
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


const showPopupBtn = document.querySelector(".login-btn");
const hidePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a");
const formPopup = document.querySelector(".form-popup");

showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

loginSignupLink.forEach(link => {
    link.addEventListener("click", (e)=> {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup")
    })
})


    