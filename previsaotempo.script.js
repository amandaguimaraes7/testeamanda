html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Previsão do Tempo</title>
</head>
<body>
  <h1>Previsão do Tempo</h1>
  <form onsubmit="return false;">
    <label for="search">Digite a cidade:</label>
    <input type="text" id="search" />
    <button onclick="getWeather()">Buscar</button>
  </form>
  <div id="current-weather"></div>
  <h2>Previsão para os próximos dias:</h2>
  <div id="future-weather"></div>

  <script>
    //API keys
    const CURRENT_WEATHER_API_KEY = "current-api-key-here";
    const FUTURE_WEATHER_API_KEY = "future-api-key-here";

    // URLs for the APIs
    const currentWeatherURL = "https://api.weatherbit.io/v2.0/current?";
    const futureWeatherURL = "https://api.weatherbit.io/v2.0/forecast/daily?";

    // This function gets called when the user submits the form
    function getWeather() {

      // Get the search value from the form
      const search = document.getElementById("search").value;

      // If there is nothing typed in the search field do nothing
      if (search.length == 0 ) {
        return;
      }

      //Here we use the URL to the Weatherbit API keys to query the API for the current weather in the user's location
      const currentWeatherUrl = `${currentWeatherURL}city=${search}&key=${CURRENT_WEATHER_API_KEY}`;

      fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => {

          // Get the location name from the API data
          const location = data.data[0].city_name;

          // Get the description of the weather from the API data
          const description = data.data[0].weather.description;

          // Get the temperature in Celsius from the API data
          const temperature = data.data[0].temp;

          //Display the information in the HTML
          const currentWeather = `
            <h2>Tempo Atual em ${location}</h2>
            <p>Clima: ${description}</p>
            <p>Temperatura: ${temperature} °C</p>
          `;
          document.getElementById("current-weather").innerHTML = currentWeather;
        })
        .catch(err => console.log(err));

      //Here we use the URL to the Weatherbit API keys to query the API for the future weather in the user's location
      const futureWeatherUrl = `${futureWeatherURL}city=${search}&key=${FUTURE_WEATHER_API_KEY}`;

      fetch(futureWeatherUrl)
        .then(res => res.json())
        .then(data => {

          // Data for the next 7 days is returned, so we only use the first 5 days
          const futureWeather = data.data.slice(0, 5);

          const weatherHtml = futureWeather
            .map(w => {
              return `
                <div>
                  <p>${w.valid_date}</p>
                  <p>${w.weather.description}</p>
                  <p>Min: ${w.min_temp} °C</p>
                  <p>Max: ${w.max_temp} °C</p>
                </div>
              `;
            })
            .join("");

          //Display the information in the HTML
          document.getElementById("future-weather").innerHTML = weatherHtml;
        })
        .catch(err => console.log(err));
    }
  </script>
</body>
</html>