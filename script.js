var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var cityName = document.querySelector('.name');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var fiveDayTemp = document.querySelector('.forecastTemp');
var fiveDayHumidity = document.querySelector('.forecastHumidity');
var fiveDayWind = document.querySelector('.forecastWind');
var searchHistory = document.querySelector('.searchHistory');

var forecastContainer = document.querySelector('.forecast');

var searchedCities = JSON.parse(localStorage.getItem("cityName"))||[];

/* console.log(userInputValue); */

var apiUrlTest = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253' 

/*  Test function with console.log */

function getCityLocation(userInputValue){
  var userInputValue = userInput.value;
  console.log(userInput);
  var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInputValue+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'
     console.log(geoCodeApiUrl);
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
          // console.log(data.list[0].main.temp);
         
           var cityNameValue = data.city.name;
           var tempValue = data.list[0].main.temp;
           var windValue = data.list[0].wind.speed;
           var humidityValue = data.list[0].main.humidity;

          cityName.innerHTML = 'City: '+ cityNameValue; 
          temp.innerHTML = 'Temperature: '+ tempValue;
          wind.innerHTML = 'Wind: '+ windValue;
          humidity.innerHTML = 'Humidity: '+ humidityValue;
          searchedCities.push(cityNameValue);
          localStorage.setItem("cityName", JSON.stringify(searchedCities)); //adding cityname to local storage
         })

}

function fiveDayForecast(lat, lon){
 var fiveForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

  

  fetch(fiveForecast)
         .then(response => response.json())
         .then(data => {
          for (let i = 0; i < data.list.length; i += 8){
            //  console.log(data.list[i]); 

          var fiveDayTempValue = document.createElement("p");
          fiveDayTempValue.classList.add('forecastTemp');
          fiveDayTempValue.textContent = `Temp: ${data.list[i].main.temp}`;

          var fiveDayWindValue = document.createElement("p");
          fiveDayWindValue.classList.add('forecastWind');
          fiveDayWindValue.textContent = `Wind: ${data.list[i].wind.speed}`;

          var fiveDayHumidityValue = document.createElement("p");
          fiveDayHumidityValue.classList.add('forecastHumidity');
          fiveDayHumidityValue.textContent = `Humidity: ${data.list[i].main.humidity}`;

          
         
          //create container for each day
          var forecastDayContainer = document.createElement('div');
          //append all elements to div
          forecastDayContainer.append(fiveDayTempValue);
          //append div to a container element that already is in HTML
          forecastDayContainer.append(fiveDayWindValue);
          forecastDayContainer.append(fiveDayHumidityValue);
          forecastContainer.append(forecastDayContainer);
          

          localStorage.setItem(`forecast_${i}`, JSON.stringify({
            temperature: data.list[i].main.temp,
            wind: data.list[i].wind.speed,
            humidity: data.list[i].main.humidity
          }));
          
          var storedData = localStorage.getItem('forecast_0');
          if (storedData) {
            var forecastData = JSON.parse(storedData);
            /* console.log(forecastData.temperature); // Access the temperature value
            console.log(forecastData.wind);       // Access the wind value
            console.log(forecastData.humidity);   // Access the humidity value */
          } 
          }
         }); 
  
        }
//EF -- retrieving stored values, printing to searchHistory

function generateSearchHistoryLi(cityName) {
  var li = $('<li>').text(cityName);
  return li;
}

function renderLi(){
  // Retrieve stored search history
  var storedSearchHistory = JSON.parse(localStorage.getItem('cityName')) || [];
console.log(storedSearchHistory);
  // Generate <li> elements and append them to #searchHistory
  for (var i = 0; i < storedSearchHistory.length; i++) {
    var cityNameValue = storedSearchHistory[i];
    var li = generateSearchHistoryLi(cityNameValue);
    li.addClass("weatherCity");
    console.log(li);
    $('#searchHistory').append(li);
    li.click(function(event){
      let liCity = "";
      event.preventDefault();
      liCity = li.text();
      console.log(liCity);
 getCityLocation(liCity);

    })
  }
}

renderLi();



button.addEventListener('click', getCityLocation);

 

