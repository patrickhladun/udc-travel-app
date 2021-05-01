import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const getBackground = () => {
    fetch('http://localhost:8080/background')
    .then(response => response.json())
    .then(response => {
        const header = document.getElementById('header');
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
        
        const tripItem = document.createElement('div');
        tripItem.classList.add('trip', 'accordion');

        const { id, tripTitle, startDate, endDate, days } = trip;

        tripItem.innerHTML = `
            <div class="trip__header" data-accordion="toggle">
                <h2 class="trip__title">${tripTitle}</h2>
                <div class="trip__details">
                    <p><span>Start date:</span> ${startDate}</p>
                    <p><span>End date:</span> ${endDate}</p>
                    <p><span>Length of the trip:</span> ${days} Days</p>
                    </p>
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
                        <button type="submit" class="pushDestination">Add Destination</button>
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

            if(item.classList.value === 'pushDestination') {
                let destination = {};
                const city = form.querySelector("[data-dest='city']");
                const tripId = form.querySelector("[data-dest='tripId']");

                const payload = {
                    city: city.value
                };

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
                    destinations.push(destination);
                    localStorage.setItem('destinations', JSON.stringify(destinations));
                    
                    showDestinations(destination.tripId);
                });
            }
        }
    });
};

const getWeatherIcon = () => {
    
};

export const showDestinations = (tripId) => {
    const destinations = JSON.parse(localStorage.getItem('destinations'));
    const destinationList = document.querySelector(`[data-destination-list="${tripId}"]`);
    destinationList.innerHTML = '';

    if(destinations) {
        destinations.forEach(destination => {
            const item = document.createElement('div');
            item.classList.add('destination', 'accordion');

            if(tripId === destination.tripId) {
                const { clouds, temp } = destination.curentWeather;
                item.innerHTML = `
                    <div class="destination__header" data-accordion="toggle">
                        <h3 class="destination__title">${destination.city}</h3>
                    </div>
                    <div class="destination__info" data-accordion="panel">
                        <img class="destination__image" src="${destination.imageURL}" />
                        <div class="current-weather">
                            <div class="current-weather__temp">${temp} ℃</div>
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
        if(e.target.matches(".accordion") || e.target.closest(".accordion")) {
            const item = e.target;
            if(item.hasAttribute('data-accordion') && item.getAttribute('data-accordion') === 'toggle') {
                const parent = item.parentElement;
                const toggle = parent.querySelector("[data-accordion='toggle']");
                const panel = parent.querySelector("[data-accordion='panel']");
                toggle.classList.toggle('active');
                panel.classList.toggle('active');
            }
        }
    });
}