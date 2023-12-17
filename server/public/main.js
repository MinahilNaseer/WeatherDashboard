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
    $('#weatherForm').submit(function (e){
        e.preventDefault();

        const cityName = $('#CityInput').val();

        $.post('/',{cityName},function(data){
            console.log(data);
           $('#weather-temp').text(data.temp+'C');
           $('#weather-desc').text(data.desc);
            $('#name').text(data.name);
            $('#pressure').text(data.press + ' hPa');
            //const iconUrl = `https://openweathermap.org/img/w/${data.icon}.png`;
            //$('#weather-icon').text(data.icon);
            const iconUrl = `https://openweathermap.org/img/w/01d.png`;
            $('#weather-icon').attr('src', iconUrl);
            $('#weather-icon').attr('alt', data.desc);
            $('#windspeed').text(data.windspeed+'Km/h');  
            $('#humidity').text(data.humidity+'%');
        });

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

    