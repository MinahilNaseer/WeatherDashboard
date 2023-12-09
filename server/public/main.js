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
            $('#windspeed').text(data.windspeed+'Km/h');  
            $('#humidity').text(data.humidity+'%');
            $('#pressure').text(data.pressure+'bpa');
        });
    });
});



    