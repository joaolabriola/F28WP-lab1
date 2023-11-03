// Get references to input field, button, and weather info div
var cityInput = document.getElementById("cityInput");
var btn = document.getElementById("btn");
var weatherInfo = document.getElementById("weather-info");
const apiKey = '42c19b9b7c61b64e7e1c97ed1ba19dc0';

// Add an event listener to the button
btn.addEventListener("click", function () {
    // Get the value of the input field
    var cityName = cityInput.value.trim();

    if (cityName === "") {
        // alert user if input is empty
        alert("Please enter a valid city name.");
    } else {
        // calls find coordinates fuction, using a callback function, to avoid weather being fetched before new coordinates are found
        findCoords(cityName, function (coords) {
            // callback function requests the weather data using coordinates from findCoords
            if (coords) {
                var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
                var weatherRequest = new XMLHttpRequest();

                weatherRequest.open('GET', weatherUrl);

                weatherRequest.onerror = function () {
                    alert("Network Error: Weather request failed");
                };

                weatherRequest.onload = function () {
                    if (weatherRequest.status === 200) {
                        var ourData = JSON.parse(weatherRequest.responseText);
                        renderHTML(ourData, coords.name);      // update the info on webpage using data fetched from API
                    } else {
                        alert("HTTP Status Code Error: " + weatherRequest.status);
                    }
                };

                weatherRequest.send();
            } else {
                alert("API-Specific Error: Unable to find coordinates for the city");
            }
        });
    }
});

function findCoords(city, callback) {
    var ourRequest = new XMLHttpRequest();
    var coordsUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    ourRequest.open('GET', coordsUrl);

    ourRequest.onerror = function () {
        alert("Network Error: Request failed");
    };

    ourRequest.onload = function () {
        if (ourRequest.status === 200) {
            let ourData = JSON.parse(ourRequest.responseText);
            var coords = {
                lat: ourData[0].lat,
                lon: ourData[0].lon,
                name: ourData[0].name
            };
            callback(coords);
        } else {
            alert("HTTP Status Code Error: " + ourRequest.status);
            callback(null); // Call the callback with null to indicate failure
        }
    };

    ourRequest.send();
}

function renderHTML(data, city) {
    var htmlString = "<p>The weather in " + city + " is " + data.weather[0].description + ".<br>The temperature is " +
        data.main.temp + '°C with a wind speed of ' + data.wind.speed + 'm/s.</p><div class="line"></div>';

    weatherInfo.insertAdjacentHTML('beforeend', htmlString);
}
