import { getForecastWeather } from './getForecastWeather';
import { arrow, remove } from './icons';

/**
 * Grab destinations from local storage and display them in the relevant trip
 */
export const showDestinations = (tripId) => {
    const destinations = JSON.parse(localStorage.getItem('destinations'));
    const destinationList = document.querySelector(`[data-destination-list="${tripId}"]`);
    destinationList.innerHTML = '';

    if(destinations) {
        // For each destination in the local storage generate html code
        destinations.forEach(destination => {
            const item = document.createElement('div');
            item.classList.add('destination', 'accordion');
            item.setAttribute('data-accordion', 'item');
            if(tripId === destination.tripId) {
                const { clouds, weather, temp } = destination.curentWeather;
                let forecast = document.createElement('div');
                forecast.classList.add('forecast');
                // Create weather columns for forecast weather
                forecast.appendChild(getForecastWeather(destination.forecastWeather));
                forecast = forecast.outerHTML;

                item.innerHTML = `
                    <div class="destination__header">
                        <div class="destination__basic">
                            <h3 class="destination__title">${destination.city}</h3>
                            <img class="destination__weatherIcon" src="/images/icons/${weather.icon}.png" />
                            <span class="destination__desc">${weather.description}</span>
                            <span class="destination__current-temp">${temp} ℃</span>
                            <span class="destination__icon icon icon-arrow push-right" data-accordion="toggle">${arrow}</span>
                            <span class="destination__icon icon icon-remove" data-action="remove" data-remove="dest" data-removeid="${destination.id}" data-tripid="${tripId}">${remove}</span>
                        </div>
                    </div>
                    <div class="destination__info" data-accordion="panel">
                        <img class="destination__image" src="${destination.imageURL}" />
                        <div class="destination__forecast">
                            <h3>Forecast weather:</h3>
                            ${forecast}
                        </div>
                    </div>
                `;
                destinationList.appendChild(item);
            }
        });
    }
}