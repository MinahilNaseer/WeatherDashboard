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
    