var url;
var lat;
var lon;
var celsius;
var tempCelcius;
var tempFahren;
var city;
var country;
var weatherMain;
var weatherTemp;
var icon;

function switchTemp() {
    if (celcius === true) {
        weatherTemp = tempFahren;
        document.getElementById("symbol").innerHTML = "<i class=\"wi wi-fahrenheit\"></i>";
        document.getElementById("weatherTemp").innerHTML = weatherTemp;
        celcius = false;

    } else {
        weatherTemp = tempCelcius;
        document.getElementById("symbol").innerHTML = "<i class=\"wi wi-celsius\"></i>";
        document.getElementById("weatherTemp").innerHTML = weatherTemp;
        celcius = true;
    }
}

$(document).ready(function() {

  $('#symbol').click(function(){ switchTemp();
                                
    });

  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    
            $("#city").html(data.city);
            $("#country").html(data.country);
            city = data.city;
            countryCode = data.countryCode;
            url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countryCode + '&appid=b2fc4379d2103e91efa87b191215ee13&units=metric';
            getWeatherData();
        });
}); //ready

function getWeatherData() {

    var output = $.ajax({
        url: url,
        type: 'GET',
        data: {},
        dataType: 'json',

        success: function(data) {

            weatherMain = data.weather[0].main;
            weatherDesc = data.weather[0].description;
            tempCelcius = Math.round(data.main.temp);  // round temp in Celcius to nearest integer
            tempFahren = Math.round(data.main.temp * 1.8 + 32); // convert temp to Fahrenheit and then round to nearest integer
            weatherTemp = tempCelcius;
            celcius = true;

            switch (weatherDesc) {
                  case "clear sky":
                      icon = "<i class=\"wi wi-day-sunny\"></i>";
                      break;
                  case "few clouds":
                      icon = "<i class=\"wi wi-cloud\"></i>";
                      break;
                  case "scattered clouds":
                      icon = "<i class=\"wi wi-cloudy\"></i>";
                      break;
                  case "broken clouds":
                      icon = "<i class=\"wi wi-cloudy\"></i>";
                      break;
                  case "shower rain":
                  icon = "<i class=\"wi wi-showers\"></i>";
                      break;
                  case "rain":
                  icon = "<i class=\"wi wi-rain\"></i>";
                      break;
                  case "thundershower":
                  icon = "<i class=\"wi wi-storm-showers\"></i>";
                      break;
                  case "snow":
                      icon = "<i class=\"wi wi-snow\"></i>";//"<img src=\"assets\/svg\/snowing-1.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "mist":
                  icon = "<i class=\"wi wi-fog\"></i>";

                      break;
              }

            document.getElementById("weatherTemp").innerHTML = weatherTemp;
            document.getElementById("icon").innerHTML = icon;
            document.getElementById("weatherMain").innerHTML = weatherMain;
            document.getElementById("city").innerHTML = city;
        }
    });
}
