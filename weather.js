

const apiKey = 'b3e2f1ab01ead59aa46da84aedefff75';
const button = document.getElementById('getWeather');
const input = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');


const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("City not found");
  return await response.json();
};


const displayWeather = (data) => {
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  resultDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
  `;
};


const displayError = (message) => {
  resultDiv.innerHTML = `<p style="color:black; font-weight:bold; margin-top: 10px;">${message}</p>`;
};


const handleGetWeather = async () => {
  const city = input.value.trim();
  if (!city) return displayError("Please enter a city name.");

  resultDiv.innerHTML = `<p style="color:black; font-weight:bold; margin-top: 10px;">Loading weather data...</p>`;

  try {
    const data = await fetchWeather(city);
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
};


button.addEventListener('click', handleGetWeather);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleGetWeather();
});
