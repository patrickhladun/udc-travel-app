import moment from 'moment';
import { arrow, remove } from './icons';

const getForecastWeather = (forecast) => {
    const fragment = document.createDocumentFragment();1

    const columns = forecast.map(day => {
        const column = document.createElement('div');
        const weekDay = moment(day.datetime).format('ddd');
        const date = moment(day.datetime).format('DD');
        const month = moment(day.datetime).format('MMM');
        column.classList.add('forecast__column');
        const columnHTML = `
            <div class="forecast__month">${month}</div>
            <div class="forecast__day">${weekDay}</div>
            <div class="forecast__date">${date}</div>
            <img class="forecast__icon" src="/images/icons/${day.weather.icon}.png" />
            <div class="forecast__temp">${day.temp}&nbsp;℃</div>
        `;
        column.innerHTML = columnHTML;
        fragment.appendChild(column);
    });
    return fragment;
};

export const showDestinations = (tripId) => {
    const destinations = JSON.parse(localStorage.getItem('destinations'));
    const destinationList = document.querySelector(`[data-destination-list="${tripId}"]`);
    destinationList.innerHTML = '';

    if(destinations) {
        destinations.forEach(destination => {
            const item = document.createElement('div');
            item.classList.add('destination', 'accordion');
            item.setAttribute('data-accordion', 'item');
            if(tripId === destination.tripId) {
                const { clouds, weather, temp } = destination.curentWeather;
                let forecast = document.createElement('div');
                forecast.classList.add('forecast');
                forecast.appendChild(getForecastWeather(destination.forecastWeather));
                forecast = forecast.outerHTML;

                item.innerHTML = `
                    <div class="destination__header">
                        <div class="destination__basic">
                            <h3 class="destination__title">${destination.city}</h3>
                            <img class="destination__weatherIcon" src="/images/icons/${weather.icon}.png" />
                            <span class="destination__desc">${weather.description}</span>
                            <span class="destination__current-temp">Current temp: ${temp} ℃</span>
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