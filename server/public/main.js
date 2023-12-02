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
    $('#weatherForm').submit(function (e){
        e.preventDefault();

        const cityName = $('#CityInput').val();

        $.post('/',{cityName},function(data){
            console.log(data);
            $('#weather-temp').text(data.temp+'C');
            $('#weather-desc').text(data.desc);
            $('#name').text(data.name);
            
        });
    });
});
    