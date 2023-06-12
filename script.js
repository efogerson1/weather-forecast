var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var cityName = document.querySelector('.name');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var fiveDayTemp = document.querySelector('.forecastTemp')
var fiveDayHumidity = document.querySelector('.forecastHumidity')
var fiveDayWind = document.querySelector('.forecastWind')


/*  Test function with console.log */
  var apiUrlTest = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253' 


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
  var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

         fetch(currentWeather)
         .then(response => response.json())
         .then(data => {
         
           var cityNameValue = data['name'];
           var tempValue = data['main']['temp'];
           var windValue = data['wind']['speed'];
           var humidityValue = data['main']['humidity'];

          cityName.innerHTML = 'City: '+ cityNameValue; 
          temp.innerHTML = 'Temperature: '+ tempValue;
          wind.innerHTML = 'Wind: '+ windValue;
          humidity.innerHTML = 'Humidity: '+ humidityValue;

            
          /*  console.log(data); */

         })
         .catch(error => alert(error));

}

function fiveDayForecast(lat, lon){
  var fiveForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

  fetch(fiveForecast)
         .then(response => response.json())
         .then(data => {
          for (let i = 0; i < data.list.length; i += 8){
            console.log(data.list[i]);

          }
         }); 

       var fiveDayTempValue = data[0]['main']['temp'];
       var fiveDayWindValue = data[0]['wind']['speed'];
       var fiveDayHumidityValue = data[0]['main']['humidity'];
       
       cityName.innerHTML = 'City: '+ cityNameValue; 
          forecastTemp.innerHTML = 'Temperature: '+ fiveDayTempValue;
          forecastWind.innerHTML = 'Wind: '+ fiveDayWindValue;
          forecastHumidity.innerHTML = 'Humidity: '+ fiveDayHumidityValue;

          console.log(data);

}

button.addEventListener('click', getCityLocation);


