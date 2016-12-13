/*var data = {
  "coord":{"lon":139,"lat":35 },
  "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
  "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
  "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
  "wind":{"speed":7.31,"deg":187.002},
  "rain":{"3h":0},
  "clouds":{"all":92},
  "dt":1369824698,
  "id":1851632,
  "name":"Shuzenji",
  "cod":200
}
*/

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

/*
var conditionSymbol = { // object used to select weather icon to display
    1: "clear sky": "<img src=\"assets\/svg\/sun.svg\" height=\"25px\" width=\"25px\">",
    2: "few clouds": "<img src=\"assets\/svg\/cloudy.svg\" height=\"25px\" width=\"25px\">",
    3: "scattered clouds": "<img src=\"assets\/svg\/cloud.svg\" height=\"25px\" width=\"25px\">",
    4: "broken clouds": "<img src=\"assets\/svg\/cloud.svg\" height=\"25px\" width=\"25px\">",
    5: "shower rain": "<img src=\"assets\/svg\/rain-2.svg\" height=\"25px\" width=\"25px\">",
    6: "rain": "<img src=\"assets\/svg\/rain-1.svg\" height=\"25px\" width=\"25px\">",
    7: "thundershower": "<img src=\"assets\/svg\/storm-2.svg\" height=\"25px\" width=\"25px\">",
    8: "snow": "<img src=\"assets\/svg\/snowing-1.svg\" height=\"25px\" width=\"25px\">",
    9: "mist": "<img src=\"assets\/svg\/moon.svg\" height=\"25px\" width=\"25px\">"
};

*/

function switchTemp() {
    if (celcius === true) {
        weatherTemp = tempFahren;
        document.getElementById("symbol").innerHTML = "<img src=\"assets\/svg\/farenheit.svg\" height=\25px\" width=\"25px\">";
        document.getElementById("weatherTemp").innerHTML = weatherTemp;
        return celcius = false;

    } else {
        weatherTemp = tempCelcius;
        document.getElementById("symbol").innerHTML = "<img src=\"assets\/svg\/celsius.svg\" height=\25px\" width=\"25px\">";
        document.getElementById("weatherTemp").innerHTML = weatherTemp;
        return celcius = true;
    }
}

$(document).ready(function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude.toFixed(2);
            lon = position.coords.longitude.toFixed(2);
            url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=b2fc4379d2103e91efa87b191215ee13&units=metric';
            getWeatherData();
        });
    }
});

function getWeatherData() {

    var output = $.ajax({
        url: url,
        type: 'GET',
        data: {},
        dataType: 'json',

        success: function(data) {

            city = data.name;
            country = data.sys.country;
            weatherMain = data.weather[0].main;
            tempCelcius = Math.round(data.main.temp); // round temp in Celcius to nearest integer
            tempFahren = Math.round(data.main.temp * 1.8 + 32); // convert temp to Fahrenheit and then round to nearest integer
            weatherTemp = tempCelcius;
            celcius = true;


            switch (weatherMain) {
                  case "clear sky":
                      icon = "<img src=\"assets\/svg\/sun.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "few clouds":
                      icon = "<img src=\"assets\/svg\/cloudy.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "scattered clouds":
                      icon = "<img src=\"assets\/svg\/cloud.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "broken clouds":
                      icon = "<img src=\"assets\/svg\/cloud.svg\" height=\"25px\" width=\"25px\">"
                      break;
                  case "shower rain":
                      icon = "<img src=\"assets\/svg\/rain-2.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "rain":
                      icon = "<img src=\"assets\/svg\/rain-1.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "thundershower":
                      icon = "<img src=\"assets\/svg\/storm-2.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "snow":
                      icon = "<img src=\"assets\/svg\/snowing-1.svg\" height=\"25px\" width=\"25px\">";
                      break;
                  case "mist":
                      icon = "<img src=\"assets\/svg\/moon.svg\" height=\"25px\" width=\"25px\">";
                      break;
              }


            document.getElementById("icon").innerHTML = icon;
            document.getElementById("weatherMain").innerHTML = weatherMain;
            document.getElementById("weatherTemp").innerHTML = weatherTemp;
            document.getElementById("city").innerHTML = city;
            document.getElementById("country").innerHTML = country;
        }
    });




}
