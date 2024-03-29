var openWeatherApiKey = '4d7549140fc3c348718709426b6b3a92'
var openWeatherCoordinatesUrl = 'api.openweathermap.org/data/2.5/forecast?lat=32.7767lon=-96.7970&appid=4d7549140fc3c348718709426b6b3a92';
var oneCallUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
var userFormEL = $('#city-search');
var stuff2El = $('.stuff2');
var cityInputEl = $('#city');
var fiveDayEl = $('#five-day');
var searchHistoryEl = $('#search-history');
var currentDay = moment().format('M/DD/YYYY');
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
var searchHistoryArray = loadSearchHistory();


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function loadSearchHistory() {
    var searchHistoryArray = JSON.parse(localStorage.getItem('search history'));

    if (!searchHistoryArray) {
        searchHistoryArray = {
            searchedCity: [],
        };
    } else {
        for (var i = 0; i < searchHistoryArray.searchedCity.length; i++) {
            searchHistory(searchHistoryArray.searchedCity[i]);
        }
    }

    return searchHistoryArray;
}

function saveSearchHistory() {
    localStorage.setItem('search history', JSON.stringify(searchHistoryArray));
};

function searchHistory(city) {
    var searchHistoryBtn = $('<button>')
        .addClass('btn')
        .text(city)
        .on('click', function () {
            $('#current-weather').remove();
            $('#five-day').empty();
            $('#five-day-header').remove();
            getWeather(city);
        })
        .attr({
            type: 'button'
        });

    searchHistoryEl.append(searchHistoryBtn);
}

function getWeather(city) {
    var apiCoordinatesUrl = openWeatherCoordinatesUrl + city + '&appid=' + openWeatherApiKey;
    fetch(apiCoordinatesUrl)
        .then(function (coordinateResponse) {
            if (coordinateResponse.ok) {
                coordinateResponse.json().then(function (data) {
                    var cityLatitude = data.coord.lat;
                    var cityLongitude = data.coord.lon;
                    var apiOneCallUrl = oneCallUrl + '?lat=' + cityLatitude + '&lon=' + cityLongitude + '&appid=' + openWeatherApiKey + '&units=imperial';

                    fetch(apiOneCallUrl)
                        .then(function (weatherResponse) {
                            if (weatherResponse.ok) {
                                weatherResponse.json().then(function (weatherData) {
                                    var currentWeatherEl = $('<div>')
                                        .attr({
                                            id: 'current-weather'
                                        })
                                    console.log(weatherData)
                                    var weatherIcon = weatherData.current.weather[0].icon;
                                    var cityCurrentWeatherIcon = weatherIconUrl + weatherIcon + '.png';

                                    var currentWeatherHeadingEl = $('<h2>')
                                        .text(city + ' (' + currentDay + ')');
                                    var iconImgEl = $('<img>')
                                        .attr({
                                            id: 'current-weather-icon',
                                            src: cityCurrentWeatherIcon,
                                            alt: 'Weather Icon'
                                        })
                                    var currWeatherListEl = $('<ul>')

                                    var currWeatherDetails = ['Temp: ' + weatherData.current.temp + ' °F', 'Wind: ' + weatherData.current.wind_speed + ' MPH', 'Humidity: ' + weatherData.current.humidity + '%', 'UV Index: ' + weatherData.current.uvi]

                                    for (var i = 0; i < currWeatherDetails.length; i++) {

                                        if (currWeatherDetails[i] === 'UV Index: ' + weatherData.current.uvi) {

                                            var currWeatherListItem = $('<li>')
                                                .text('UV Index: ')

                                            currWeatherListEl.append(currWeatherListItem);

                                            var uviItem = $('<span>')
                                                .text(weatherData.current.uvi);

                                            if (uviItem.text() <= 2) {
                                                uviItem.addClass('favorable');
                                            } else if (uviItem.text() > 2 && uviItem.text() <= 7) {
                                                uviItem.addClass('moderate');
                                            } else {
                                                uviItem.addClass('severe');
                                            }

                                            currWeatherListItem.append(uviItem);

                                        } else {
                                            var currWeatherListItem = $('<li>')
                                                .text(currWeatherDetails[i])
                                            currWeatherListEl.append(currWeatherListItem);
                                        }

                                    }

                                    $('#five-day').before(currentWeatherEl);
                                    currentWeatherEl.append(currentWeatherHeadingEl);
                                    currentWeatherHeadingEl.append(iconImgEl);
                                    currentWeatherEl.append(currWeatherListEl);

                                    var fiveDayHeaderEl = $('<h2>')
                                        .text('5-Day Forecast:')
                                        .attr({
                                            id: 'five-day-header'
                                        })

                                    $('#current-weather').after(fiveDayHeaderEl)


                                    var fiveDayArray = [];

                                    for (var i = 0; i < 5; i++) {
                                        let forecastDate = moment().add(i + 1, 'days').format('M/DD/YYYY');

                                        fiveDayArray.push(forecastDate);
                                    }

                                    for (var i = 0; i < fiveDayArray.length; i++) {
                                        var cardDivEl = $('<div>')
                                            .addClass('stuff3');

                                        var cardBodyDivEl = $('<div>')
                                            .addClass('card-body');

                                        var cardTitleEl = $('<h3>')
                                            .addClass('card-title')
                                            .text(fiveDayArray[i]);

                                        var forecastIcon = weatherData.daily[i].weather[0].icon;

                                        var forecastIconEl = $('<img>')
                                            .attr({
                                                src: weatherIconUrl + forecastIcon + '.png',
                                                alt: 'Weather Icon'
                                            });

                                        var currWeatherDetails = ['Temp: ' + weatherData.current.temp + ' °F', 'Wind: ' + weatherData.current.wind_speed + ' MPH', 'Humidity: ' + weatherData.current.humidity + '%', 'UV Index: ' + weatherData.current.uvi]
                                        var tempEL = $('<p>')
                                            .addClass('card-text')
                                            .text('Temp: ' + weatherData.daily[i].temp.max)
                                        var windEL = $('<p>')
                                            .addClass('card-text')
                                            .text('Wind: ' + weatherData.daily[i].wind_speed + ' MPH')
                                        var humidityEL = $('<p>')
                                            .addClass('card-text')
                                            .text('Humidity: ' + weatherData.daily[i].humidity + '%')


                                        fiveDayEl.append(cardDivEl);
                                        cardDivEl.append(cardBodyDivEl);
                                        cardBodyDivEl.append(cardTitleEl);
                                        cardBodyDivEl.append(forecastIconEl);
                                        cardBodyDivEl.append(tempEL);
                                        cardBodyDivEl.append(windEL);
                                        cardBodyDivEl.append(humidityEL);
                                    }

                                })
                            }
                        })
                });
            } else {
                alert('Error: Open Weather could not find city')
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather');
        });
}

function submitCitySearch(event) {
    event.preventDefault();

    var city = titleCase(cityInputEl.val().trim());

    if (searchHistoryArray.searchedCity.includes(city)) {
        alert(city + ' is included in history below. Click the ' + city + ' button to get weather.');
        cityInputEl.val('');
    } else if (city) {
        getWeather(city);
        searchHistory(city);
        searchHistoryArray.searchedCity.push(city);
        saveSearchHistory();
        cityInputEl.val('');

    } else {
        alert('Please enter a city');
    }
}

userFormEL.on('submit', submitCitySearch);

$('#search-btn').on('click', function () {
    $('#current-weather').remove();
    $('#five-day').empty();
    $('#five-day-header').remove();
})