var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var place = document.querySelector('.place');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var humidity = document.querySelector('.humidity');


/* --- Test function with console.log
  var apiUrlTest = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253' 

 button.addEventListener('click', function(){
    var userInputValue = userInput.value;
    var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInputValue+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'
    
        fetch(geoCodeApiUrl)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => alert("Wong!"))
    
    })   */

      button.addEventListener('click', function(){
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
        })  
