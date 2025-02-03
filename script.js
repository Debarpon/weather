function showMainScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

const API_KEY = 'cb6538f8a8fc4df1be492634250201';

async function getWeather() {
    const locationInput = document.getElementById('location-input').value;
    
    if (!locationInput) {
        alert('Please enter a location');
        return;
    }

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationInput}&aqi=yes`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            alert('Location not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function updateWeatherUI(data) {
    document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = `${data.current.temp_c}°C`;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = `${data.current.humidity}%`;
    document.getElementById('wind').textContent = `${data.current.wind_kph} km/h`;
    
    // Update air quality if available
    if (data.current.air_quality) {
        document.getElementById('pm2_5').textContent = data.current.air_quality.pm2_5.toFixed(1);
        document.getElementById('pm10').textContent = data.current.air_quality.pm10.toFixed(1);
    }
}

// Allow users to press Enter to search
document.getElementById('location-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});