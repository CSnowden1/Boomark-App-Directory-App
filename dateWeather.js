

function updateTime() {
  const now = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const dayOfMonth = now.getDate();
  const year = now.getFullYear();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const ampm = now.getHours() < 12 ? "AM" : "PM";
  
  const dateElement = document.getElementById("date");
  dateElement.textContent = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;
  
  const timeElement = document.getElementById("time");
  timeElement.textContent = `${hour}:${minute}:${second} ${ampm}`;
}

updateTime();
setInterval(updateTime, 1000);








// Get user's location
navigator.geolocation.getCurrentPosition(function(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  
  // Call weather API with latitude and longitude
  var api_key = "ff59c533e390456e247b1ccbb5305f43";
  var weather_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + api_key;
  
  // Fetch weather data
  fetch(weather_api_url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Use Anime.js to create an animation based on the weather conditions
      var weatherCode = data.weather[0].id;
      let animation;
      if (weatherCode < 600) {
        animation = anime({
          targets: '#weather-animation',
          translateY: 100,
          easing: 'easeInOutQuad',
          duration: 1500,
          loop: true
        });
      } else if (weatherCode >= 600 && weatherCode < 700) {
        animation = anime({
          targets: '#weather-animation',
          rotate: '1turn',
          easing: 'easeInOutQuad',
          duration: 2000,
          loop: true
        });
      } else if (weatherCode >= 700 && weatherCode < 800) {
        animation = anime({
          targets: '#weather-animation',
          scale: 1.5,
          easing: 'easeInOutQuad',
          duration: 1000,
          loop: true
        });
      } else if (weatherCode >= 800 && weatherCode < 900) {
        animation = anime({
          targets: '#weather-animation',
          rotate: '1turn',
          easing: 'easeInOutQuad',
          duration: 2000,
          loop: true
        });
      } else {
        animation = anime({
          targets: '#weather-animation',
          backgroundColor: '#F44336',
          easing: 'easeInOutQuad',
          duration: 1000,
          loop: true
        });
      }

      // Display weather information
      var weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = 'Current temperature: ' + data.main.temp + ' K';
    })
    .catch(error => {
      console.error(error);
    });
});