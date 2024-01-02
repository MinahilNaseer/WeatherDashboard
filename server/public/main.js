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
            console.log(data.icon);
            var iconurl = "https://openweathermap.org/img/wn/"+ data.icon +"@2x.png";
            console.log(iconurl);
           $('#weather-desc').text(data.desc);
            $('#weather-temp').text(data.temp+' °C');
            $('#weather-icon').attr('src',iconurl);
            $('#name').text(data.name);
            $('#windspeed').text(data.windspeed+' Km/h');  
            $('#humidity').text(data.humidity+' %');
            $('#pressure').text(data.pressure+' bpa');
            $('#feels_like').text(data.feels_like+' °C');
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
                    var iconurl = "https://openweathermap.org/img/wn/"+ data.icon +"@2x.png";
                    $('#weather-temp').text(data.temp + '°C');
                    $('#weather-desc').text(data.desc);
                    $('#name').text(data.name);
                    $('#weather-icon').attr('src',iconurl);
                    $('#windspeed').text(data.windspeed+'Km/h');  
                    $('#humidity').text(data.humidity+'%');
                    $('#pressure').text(data.pressure+'bpa');
                    $('#feels_like').text(data.feels_like+'C');
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
showPopupBtn.addEventListener("click", () => 
{
    document.body.classList.toggle("show-popup");
});
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());
loginSignupLink.forEach(link => 
    {
    link.addEventListener("click", (e)=> {
        e.preventDefault();
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup")
    })
})


$(document).ready(function () {
    $('#submitlog').click(function (e) {
        e.preventDefault();
        console.log("Button clicked!");

        const email = $('#email').val();
        const password = $('#password').val();

        $.post('/login', { email: email, password: password }, function (data) {
            console.log(data);
            if (data.success) {
                console.log("Login successful!");
                $('#user-name').text(data.email);
                $('.login').hide();
            } else {
                alert(data);
            }
        });
    });
});
function submitForm() {
    // Get form data
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    // Send form data to server using fetch
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        if (data.includes("User successfully registered")) {
          // Show success message
          document.getElementById('success').style.display = 'block';
          document.getElementById('danger').style.display = 'none';
        } else{
          // Show danger message
          document.getElementById('success').style.display = 'none';
          document.getElementById('danger').style.display = 'block';
        }
      })
      .catch(error => console.error('Error:', error));
  }

  function submitLoginForm() {
    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Send form data to server using fetch
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json()) // Assuming server sends JSON response
    .then(data => {
        console.log(data);
        if (data.success) {
            // Show success message or redirect to the logged-in page
            document.getElementById('success1').style.display = 'block';
            document.getElementById('danger1').style.display = 'none';

            // Display the email in the HTML
            document.getElementById('user-email').innerText = data.email;

            // You can also redirect to another page if login is successful
            window.location.href = '/dashboard';
        } else {
            // Show danger message
            document.getElementById('success1').style.display = 'none';
            document.getElementById('danger1').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
}


    

