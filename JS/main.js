// * HTML Elements
let searchInput = document.getElementById("searchInput");

// ^ App Variables
let weatherData;

// ? Functinos
async function getData(key) {
  let response =
    await fetch(`http://api.weatherapi.com/v1/forecast.json?key=276448666d6f4a17ae841635241210&q=${key}&days=3&aqi=no&alerts=no
`);
  let finalData = await response.json();
  return finalData;
}

async function startApp(key) {
  weatherData = await getData(key);
  todayData();
  tomorrowData();
  afterTomorrowData();
}

function todayData() {
  let date = new Date(weatherData.location.localtime);

  document.getElementById("day").innerHTML = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  document.getElementById("Month").innerHTML = date.toLocaleDateString(
    "en-US",
    { month: "short" }
  );
  document.getElementById("date").innerHTML = date.getDate();

  document.getElementById("city").innerHTML = weatherData.location.name;
  document.getElementById("degree").innerHTML =
    weatherData.current.temp_c + " C";
  document.getElementById("weatherCondition").innerHTML =
    weatherData.current.condition.text;
  document.getElementById("humidity").innerHTML =
    weatherData.current.wind_mph + " %";
  document.getElementById("winds").innerHTML =
    weatherData.current.wind_kph + " km/h";
  document.getElementById("weatherTrend").innerHTML =
    weatherData.current.wind_dir;
  document
    .getElementById("todayImg")
    .setAttribute("src", "https:" + weatherData.current.condition.icon);
}

function tomorrowData() {
  let date = new Date(weatherData.forecast.forecastday[1].date);
  document.getElementById("tommorowday").innerHTML = date.toLocaleDateString(
    "en-US",
    { weekday: "long" }
  );
  document.getElementById("maxTemperature").innerHTML =
    weatherData.forecast.forecastday[1].day.maxtemp_c + " C";

  document.getElementById("minTemperature").innerHTML =
    weatherData.forecast.forecastday[1].day.mintemp_c + " C";

  document
    .getElementById("tomImg")
    .setAttribute(
      "src",
      "https:" + weatherData.forecast.forecastday[1].day.condition.icon
    );

  document.getElementById("weatherCondition").innerHTML =
    weatherData.forecast.forecastday[1].day.condition.text;
}

function afterTomorrowData() {
  let date = new Date(weatherData.forecast.forecastday[2].date);
  document.getElementById("Aftertomorrowday").innerHTML =
    date.toLocaleDateString("en-US", { weekday: "long" });

  document.getElementById("afterTomorrowMax").innerHTML =
    weatherData.forecast.forecastday[2].day.maxtemp_c + " C";

  document.getElementById("afterTomorrowMin").innerHTML =
    weatherData.forecast.forecastday[2].day.mintemp_c + " C";

  document
    .getElementById("afterTomorrowimage")
    .setAttribute(
      "src",
      "https:" + weatherData.forecast.forecastday[2].day.condition.icon
    );

  document.getElementById("afterTomorrowCondition").innerHTML =
    weatherData.forecast.forecastday[2].day.condition.text;
}

// & Events
searchInput.addEventListener("keyup", function () {
  startApp(searchInput.value);
});

document.getElementById("findButton").addEventListener("click", function () {
  startApp(searchInput.value);
});
