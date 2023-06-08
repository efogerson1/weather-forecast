var button = document.querySelector('.button');
var userInput = document.querySelector('.userInput');
var name = document.querySelector('.name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var humidity = document.querySelector('.humidity');

var apiUrlTest = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

var geoCodeApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+userInput.value+'&limit=5&appid=e17d6c40bd10dd5e7fb0d651afd5e253'

button.addEventListener('click', function(){

    fetch(geoCodeApiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => alert("Wong!"))

})



