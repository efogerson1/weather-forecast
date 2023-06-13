var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var cityName = document.querySelector('.name');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var fiveDayTemp = document.querySelector('.forecastTemp');
var fiveDayHumidity = document.querySelector('.forecastHumidity');
var fiveDayWind = document.querySelector('.forecastWind');

var forecastContainer = document.querySelector('.forecast');




var apiUrlTest = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253' 

/*  Test function with console.log */

function getCityLocation(){
  var userInputValue = userInput.value;
  var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInputValue+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'
     
         fetch(geoCodeApiUrl)
         .then(response => response.json())
         .then(data => {
           var lon = data[0].lon;
           let lat = data[0].lat;
           console.log(lon);
           console.log(lat);
           singleDay(lat, lon);
           fiveDayForecast(lat, lon);
         })
         .catch(error => alert(error));
}

function singleDay(lat, lon){
  var currentWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

         fetch(currentWeather)
         .then(response => response.json())
         .then(data => {
          console.log(data.list[0].main.temp);
           var cityNameValue = data.city.name;
           var tempValue = data.list[0].main.temp;
           var windValue = data.list[0].wind.speed;
           var humidityValue = data.list[0].main.humidity;

          cityName.innerHTML = 'City: '+ cityNameValue; 
          temp.innerHTML = 'Temperature: '+ tempValue;
          wind.innerHTML = 'Wind: '+ windValue;
          humidity.innerHTML = 'Humidity: '+ humidityValue;

         })

}

function fiveDayForecast(lat, lon){
 var fiveForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

  

  fetch(fiveForecast)
         .then(response => response.json())
         .then(data => {
          for (let i = 0; i < data.list.length; i += 8){
             console.log(data.list[i]); 
         
          //create container for each day
          var forecastDayContainer = document.createElement('div');
          //append all elements to div
          forecastDayContainer.append(fiveDayTempValue);
          //append div to a container element that already is in HTML
          forecastDayContainer.append(fiveDayWindValue);
          forecastDayContainer.append(fiveDayHumidityValue);
          forecastContainer.append(forecastDayContainer);

          var fiveDayTempValue = document.createElement("p");
          fiveDayTempValue.textContent = `Temp: ${data.list[i].main.temp}`;

          var fiveDayWindValue = document.createElement("p");
          fiveDayWindValue.textContent = `Wind: ${data.list[i].wind.speed}`;

          var fiveDayHumidityValue = document.createElement("p");
          fiveDayHumidityValue.textContent = `Humidity: ${data.list[i].main.humidity}`;

          }
         }); 
          
}

button.addEventListener('click', getCityLocation);


