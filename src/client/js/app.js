import { v4 as uuidv4 } from 'uuid';
import { arrow, remove } from './icons';
import moment from 'moment';

export const getBackground = () => {
    fetch('http://localhost:8080/background')
    .then(response => response.json())
    .then(response => {
        const header = document.getElementById('header-bg');
        header.style.backgroundImage = `url(${response.url})`;
    });   
};

/**
 * Add a trip to localStorage by submitting trip form
 */
export const tripForm = () => {
    // Check if trip exist in localStorage
    let trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    const addTrip = document.getElementById('addTrip');
    const tripsList = document.getElementById('trip-list');

    addTrip.addEventListener('submit', (e) => {
        e.preventDefault();
        const tripTitle = document.getElementById('tripTitle').value;
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;

        // Days to tripbear
        const start = moment(startDate);
        const end = moment(endDate);
        const days = Math.abs(moment.duration(start.diff(end)).asDays());

        startDate = moment(startDate).format('MMMM, dddd');
        endDate = moment(endDate).format('MMMM, dddd');;

        const tripData = {
            id: uuidv4(),
            tripTitle,
            startDate,
            endDate,
            days
        }
        trips.push(tripData);
        localStorage.setItem('trips', JSON.stringify(trips));
        showTrips();
    });
};

export const showTrips = () => {
    const trips = JSON.parse(localStorage.getItem('trips'));
    const tripList = document.getElementById('trip-list');
    tripList.innerHTML = '';

    trips.forEach(trip => {
        const { id, tripTitle, startDate, endDate, days } = trip;
        const tripItem = document.createElement('div');
        tripItem.classList.add('trip', 'accordion');
        tripItem.setAttribute('data-accordion', 'item');

        tripItem.innerHTML = `
            <div class="trip__header">
                <div class="trip__title">
                    <span>${tripTitle}</span>
                    <span class="destination__icon icon icon-arrow push-right" data-accordion="toggle">${arrow}</span>
                    <span class="destination__icon icon icon-remove" data-action="remove" data-remove="trip" data-removeid="${id}">${remove}</span>
                </div>
                <div class="trip__details">
                    <p><strong>Your trip start on:</strong> ${startDate} <strong>, end on:</strong> ${endDate}. <strong>Length of the trip:</strong> ${days} Days</p>
                </div>
            </div>
            <div class="trip__destinations" data-accordion="panel">
                <h3>Let's visit some great places!</h3>
                <form id="${id}" class="addDestination">
                    <div class="field">
                        <input type="text" id="city" name="city" placeholder="City" data-dest="city"/>
                    </div>
                    <div class="field__hidden">
                        <input type="text" id="tripId" name="tripId" value="${id}" data-dest="tripId">
                    </div>
                    <div>
                        <button type="submit" class="pushDestination button">Add Destination</button>
                    </div>
                </form>
                <div class="destination-list" data-destination-list="${id}"></div>
            </div>
        `;
        tripList.appendChild(tripItem);
        showDestinations(id);
    });
}

export const destinationForm = () => {
    let destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations')) : [];    
    localStorage.setItem('destinations', JSON.stringify(destinations));

    document.querySelector('body').addEventListener('click', e => {

        

        if(e.target.matches(".addDestination") || e.target.closest(".addDestination")) {
            e.preventDefault();
            const item = e.target;
            const form = e.target.parentElement.parentElement;

            console.log(item);

            if(item.classList.contains('pushDestination')) {
                let destination = {};
                const city = form.querySelector("[data-dest='city']");
                const tripId = form.querySelector("[data-dest='tripId']");
                console.log('clicked');
                const payload = {
                    city: city.value
                };

                console.log(payload);

                fetch('http://localhost:8080/destination', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(response => {
                    destination = {
                        id: uuidv4(),
                        tripId: tripId.value,
                        city: city.value,
                        ...response
                    };
                    console.log(destination);
                    destinations.push(destination);
                    localStorage.setItem('destinations', JSON.stringify(destinations));
                    
                    showDestinations(destination.tripId);
                })
                .catch((error => console.log(error)));
            }
        }
    });
};

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

export const accordions = () => {
    document.querySelector('body').addEventListener('click', e => {
        if(e.target.matches("[data-accordion='toggle']") || e.target.closest("[data-accordion='toggle']")) {
            const item = e.target;
            
            if(item.hasAttribute('data-accordion') && item.getAttribute('data-accordion') === 'toggle') {
                const parent = item.closest("[data-accordion='item']");
                const toggle = parent.querySelector("[data-accordion='toggle']");
                const panel = parent.querySelector("[data-accordion='panel']");
                toggle.classList.toggle('active');
                panel.classList.toggle('active');
            }
        }
    });
}

export const removeItem = () => {
    document.querySelector('body').addEventListener('click', e => {
        if(e.target.matches("[data-action='remove']")) {
            const removeItem = e.target.getAttribute('data-remove');
            const itemId = e.target.getAttribute('data-removeid')
            
            if(removeItem === 'trip') {
                const items = JSON.parse(localStorage.getItem('trips'));
                const filtered = items.filter(item => item.id !== itemId);
                localStorage.setItem('trips', JSON.stringify(filtered));
                showTrips();
            } else if(removeItem === 'dest') {
                const tripId = e.target.getAttribute('data-tripid');
                const items = JSON.parse(localStorage.getItem('destinations'));
                const filtered = items.filter(item => item.id !== itemId);
                localStorage.setItem('destinations', JSON.stringify(filtered));
                showDestinations(tripId);
            }
        }
    });
}