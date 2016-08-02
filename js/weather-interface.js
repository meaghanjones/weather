var apiKey = require('./../.env').apiKey;
var Weather = require('./../js/weather.js').weatherModule;

$(document).ready(function() {
  var ourWeather = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    // $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
   });
  });

  $('#weatherTemp').click(function() {
    var city = $('#location').val();
    // $('#location').val("");

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
      var tempKelvin = response.main.temp;
      var tempCelsius = ourWeather.kelvinToCelsius(tempKelvin);
      var tempFahrenheit = ourWeather.celsiusToFahrenheit(tempCelsius);
      $('.showWeather').text("The temperature in " + city + " is " + tempFahrenheit + " degrees Fahrenheit");
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
   });
  });
});
