const API_KEY = '7e3c3e2d14ed2762901cfac4d4235591';

document.addEventListener('DOMContentLoaded',function(){
    const currentWeatherItemsEl = document.getElementById('current-weather-items');
    const weatherForecastEl = document.getElementById('weather-forecast');
    const currentTempE1 = document.getElementById('current-temp');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    setInterval(()=>{
        const time = new Date();
        const day = time.getDate();
    },1000);
//const currentTempEl = document.getElementById('current-temp');
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data);
        showWeatherData(data);
        })

    })
}
function showWeatherData(data){
    let{sunrise,sunset,humidity,pressure,visibility}=data.current;
    let visibilityInKm = visibility/1000;
    if (currentWeatherItemsEl) {
    currentWeatherItemsEl.innerHTML =
    `<div class="sun">
    <h3 class="title-3">Sunrise & Sunset</h3>
            <div class="sunrise">
                <span class="material-symbols-outlined">
                                        sunny
                                    </span>
                                    <div class="others">
                                        <div class="title">Sunrise</div>
                                        <div class="sunrise-time">${window.moment(sunrise * 1000).format('HH:mm a')}</div>
                                    </div>
                                </div>
                                <div class="sunset">
                                    <span class="material-symbols-outlined">
                                        clear_night
                                    </span>
                                    <div class="others">
                                        <div class="title">Sunset</div>
                                        <div class="sunrise-time">${window.moment(sunset * 1000).format('HH:mm a')}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="humidity">
                                <h4 class="title-4">Humidity</h4>
                                <div class="detail">
                                    <span class="material-symbols-outlined">
                                        humidity_percentage
                                    </span>
                                    <div class="percentage">${humidity}%</div>
                                </div>
                            </div>
                            <div class="Pressure">
                                <h4 class="title-4">Pressure</h4>
                                <div class="detail">
                                    <span class="material-symbols-outlined">
                                        airwave
                                    </span>
                                    <div class="hPa">${pressure}hPa</div>
                                </div>
                            </div>
                            <div class="Visibility">
                                <h4 class="title-4">Visibility</h4>
                                <div class="detail">
                                    <span class="material-symbols-outlined">
                                        visibility
                                    </span>
                                    <div class="km">${visibilityInKm}km</div>
                                </div>
                            </div>`;
        let otherDayForecast='';
        data.daily.forEach((day,idx)=>{
            if(idx == 0){
                currentTempE1.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                            <div class="other" >
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                                <span class="material-symbols-outlined">
                                    thermostat
                                </span>
                                <div class="temp">${day.temp.day}&#176;
                                </div>
                                <div class="descrip">${day.weather[0].description}</div>
                                </div>`
            }else{
                otherDayForecast += `
                <div class="weather-forecast-item">
                                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon"
                                    class="w-icon">
                                <div class="temp">${day.temp.day}&#176;</div>
                                <div class="descrip">${day.weather[0].description}</div>
                            </div>`
            }
        })
        weatherForecastEl.innerHTML = otherDayForecast;
    }else{
        console.error("Element with ID 'current-weather-items' not found in the document.");
    }
    
}

});