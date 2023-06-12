var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var cityName = document.querySelector('.name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');


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
         .catch(error => alert("Wrong!"))
     
       

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

          cityName.innerHTML = cityNameValue; 
          temp.innerHTML = tempValue;
          wind.innerHTML = windValue;
          humidity.innerHTML = humidityValue;

            
          /*  console.log(data); */

         })
         .catch(error => alert(error));

}

function fiveDayForecast(lat, lon){
  var fiveForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e17d6c40bd10dd5e7fb0d651afd5e253`

  fetch(fiveForecast)
         .then(response => response.json())
         .then(data => {
          for (let i = 0; i < data.list.length; i += 8){
            console.log(data.list[i]);
          }
         }); 

      

}

button.addEventListener('click', getCityLocation);

      /* button.addEventListener('click', function(){
        var userInputValue = userInput.value;
        var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInputValue+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'
        
            fetch(geoCodeApiUrl)
            .then(response => response.json())
            .then(data => {
                 var name = data[1]['name']; 
                var temp = data['main']['temp'];
                var descValue = data['weather'][0]['description'];

                 place.innerHTML = placeValue; 
                temp.innerHTML = tempValue;
                desc.innerHTML = descValue;

            })
             .catch(error => alert("Wrong!"))      
        })   */
