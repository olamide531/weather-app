const apiKey = 'b3e2f1ab01ead59aa46da84aedefff75'; 
const button = document.getElementById('getWeather');
const input = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');

button.addEventListener('click', async () => {
  const city = input.value.trim();
  if (!city) {
    resultDiv.innerHTML = '<p style="color:black; font-weight: bold; margin-top: 10px;;">Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
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
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:black; font-weight: bold; margin-top: 10px;;">${error.message}</p>`;
  }
});