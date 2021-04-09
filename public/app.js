const apiKey = '&appid=<API_KEY>&units=metric';
const button = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

button.addEventListener('click', async (e) => {
    e.preventDefault();

    if(zip.value && feelings.value) {
        await getWeather();
        getEntries();
    }
});

// Connect to Open Weather Map API and fetch weather info based on user input
const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}${apiKey}`;
    const d = new Date();
    let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

    const userData = {
        zip: zip.value,
        feelings: feelings.value,
        newDate
    }

    await fetch(url)
    .then(response => response.json())
    .then(data => addEntry({...data, ...userData}))
    .catch(error => console.log(`Error: ${error}`));
};

// Send the data to the backend
const addEntry = (data) => {
    const payload = data;
    fetch('/entry', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }) 
    .then(response => response.json())
    .catch(error => console.log(`Error: ${error}`));
};

// Get entries from the backend
const getEntries = () => {
    fetch('/entry')
    .then(response => response.json())
    .then(data => updateUI(data))
    .catch(error => console.log(`Error: ${error}`));
};

// Update UI with the last entry
const updateUI = (data) => {
    const { name, newDate, main, feelings } = data;
    const temp = main.temp.toFixed(0);

    document.getElementById('date').innerHTML = `Date: ${newDate}`;
    document.getElementById('city').innerHTML = `City: ${name}`;
    document.getElementById('temp').innerHTML = `Temperature: ${temp}°C`;
    document.getElementById('content').innerHTML = `My feelings: ${feelings}`;
}