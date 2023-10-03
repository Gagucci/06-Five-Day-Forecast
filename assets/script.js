const api = ''
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const forecastContainer = document.getElementById("forecastContainer");

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const forecast = data.list;
            forecastContainer.innerHTML = "";
            forecast.forEach((item, index) => {
                if (index % 8 === 0) {
                    const date = new Date(item.dt * 1000);
                    const day = date.getDay();
                    const dayName = getDayName(day);
                    const temp = item.main.temp;
                    const icon = item.weather[0].icon;
                    const description = item.weather[0].description;
                    const forecastItem = `
                        <div class="forecast-item">
                            <div class="day">${dayName}</div>
                            <div class="icon">
                                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="">
                            </div>
                            <div class="temp">${temp}°C</div>
                            <div class="description">${description}</div>
                        </div>
                    `;
                    forecastContainer.innerHTML += forecastItem;
                }
            });
        })
        .catch(error => console.log(error));
}