var searchButton = document.querySelector('.searchButton');
var inputValue = document.querySelector('.userInput');
var name = document.querySelector('.name');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e17d6c40bd10dd5e7fb0d651afd5e253'

searchButton.addEventListener('click', function(){

    fetch(apiURL).then(response => response.json()).then(data => console.log(data))
    .catch(error => alert("Wong!"))

})



