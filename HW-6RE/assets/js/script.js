var recentSearches = JSON.parse(localStorage.getItem("searches")) || [];
console.log(recentSearches);
var searchHistory = document.getElementById("recently-viewed");
getWeather("Dallas");

function getWeather(city) {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=011d8600955301988250a993be42df9e&units=imperial";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      localStorage.setItem("city", JSON.stringify(data));
      console.log(data);
      var currentCity = document.getElementById("current-city");
      currentCity.textContent = city;
      setCurrentWeather(data.list[0]);
      setForecast(data.list);
    });
}

function convertToFahrenheit(kelvin) {
  var kTemp = kelvin;
  var kToFar = (kTemp - 273.15) * 1.8 + 32;
  var message = kToFar + " \xB0F";
  return message;
}

console.log(convertToFahrenheit(279.45));

function setCurrentWeather(weather) {
  var forecastDate = weather.dt;
  console.log(forecastDate);
  var convertTimeMilli = forecastDate * 1000;
  var dateTime = new Date(convertTimeMilli);
  var newDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
  console.log(newDate);
  var currentDate = document.getElementById("current-date");
  currentDate.innerHTML = newDate;
  var iconParagraphId = weather.weather[0].icon;
  var iconLink =
    "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
  console.log(iconLink);
  var iconHTML = '<img src="' + iconLink + '">';
  console.log(iconHTML);
  var currentIcon = document.getElementById("current-icon");
  currentIcon.innerHTML = iconHTML;
  console.log(weather.main.temp);
  var currentTemperature = document.getElementById("current-temperature");
  var convert = convertToFahrenheit(weather.main.temp);
  console.log(convert);
  currentTemperature.textContent =
    "Temperature: " + weather.main.temp + " \xB0F";
  var currentWind = document.getElementById("current-wind");
  currentWind.textContent = "Wind: " + weather.wind.speed + " MPH";
  var currentHumidity = document.getElementById("current-humidity");
  currentHumidity.textContent = "Humidity: " + weather.main.humidity + " %";
}

function setForecast(forecast) {
  for (var i = 0; i < forecast.length; i += 8) {
    console.log(forecast[i]);
    setForecastDay(forecast[i], i / 8 + 1);
  }
}

function setForecastDay(weather, dayNumber) {
  var iconParagraph = document.createElement("p");
  var iconParagraphId = weather.weather[0].icon;
  var iconLink =
    "https://openweathermap.org/img/wn/" + iconParagraphId + ".png";
  console.log(iconLink);
  var iconHTML = '<img src="' + iconLink + '">';
  console.log(iconHTML);
  var forecastParagraph = document.createElement("p");
  var forecastDate = weather.dt;
  console.log(forecastDate);
  var convertTimeMilli = forecastDate * 1000;
  var dateTime = new Date(convertTimeMilli);
  var newDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
  console.log(newDate);
  var day = document.getElementById("day-" + dayNumber);
  var dayList = [];
  var titleParagraph = document.createElement("p");
  console.log(iconHTML);
  titleParagraph.innerHTML = newDate + iconHTML;
  dayList.push(titleParagraph);
  var tempParagraph = document.createElement("p");
  tempParagraph.textContent = "Temp: " + weather.main.temp + " \xB0F";
  dayList.push(tempParagraph);
  day.replaceChildren(...dayList);
  var windParagraph = document.createElement("p");
  windParagraph.textContent = "Wind: " + weather.wind.speed + " MPH";
  dayList.push(windParagraph);
  day.replaceChildren(...dayList);
  var humidityParagraph = document.createElement("p");
  humidityParagraph.textContent = "Humidity: " + weather.main.humidity + " %";
  dayList.push(humidityParagraph);
  day.replaceChildren(...dayList);
}

var searchForm = document.getElementById("search-form");
var city = document.getElementById("city");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var searchCity = city.value.trim();
  executeSearch(searchCity);
  addRecentSearch(searchCity);
});

function addRecentSearch(city) {
  var recentButton = document.createElement("button");
  recentButton.textContent = city;
  recentButton.addEventListener("click", function () {
    executeSearch(city);
  });
  searchHistory.appendChild(recentButton);
}

function executeSearch(searchCity) {
  recentSearches.push(searchCity);
  localStorage.setItem("searches", JSON.stringify(recentSearches));
  getWeather(searchCity);
}
