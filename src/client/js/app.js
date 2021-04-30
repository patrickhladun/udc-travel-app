import { v4 as uuidv4 } from 'uuid';

export const getBackground = () => {
    fetch('http://localhost:8080/background')
    .then(response => response.json())
    .then(response => {
        const header = document.getElementById('header');
        header.style.backgroundImage = `url(${response.url})`;
    });   
};

export const tripForm = () => {
    let trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];    
    localStorage.setItem('trips', JSON.stringify(trips));
    const data = JSON.parse(localStorage.getItem('trips'));
    const addTrip = document.getElementById('addTrip');
    const tripsList = document.getElementById('trip-list');

    addTrip.addEventListener('submit', (e) => {
        e.preventDefault();
        const tripTitle = document.getElementById('tripTitle').value;
        const startDate = 'start date';
        const endDate = 'end date';
        const tripData = {
            id: uuidv4(),
            tripTitle,
            startDate,
            endDate
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
        tripItem.classList.add('trip');
        tripItem.innerHTML = `
            <h2>${trip.tripTitle}</h2>
            <button class="accordion">Button</button>
            <div class="trip__info panel">
                <h3>Let's visit some great places!</h3>
                <form id="${trip.id}" class="addDestination">
                    <div class="field">
                        <input type="text" id="city" name="city" placeholder="City"/>
                    </div>
                    <div class="field__hidden">
                        <input type="text" id="tripId" name="tripId" value="${trip.id}">
                    </div>
                    <div>
                        <button type="submit">Add Destination</button>
                    </div>
                </form>
                <div data-destination-list="${trip.id}"></div>
            </div>
        `;
        tripList.appendChild(tripItem);
        showDestinations(trip.id);
    });
}

export const destinationForm = () => {
    let destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations')) : [];    
    localStorage.setItem('destinations', JSON.stringify(destinations));
    const data = JSON.parse(localStorage.getItem('destinations'));

    const addDestination = document.querySelectorAll('.addDestination');

    addDestination.forEach(destination => {
        destination.addEventListener('submit', (e) => {
            e.preventDefault();
            let destination = {};
            const { city, tripId } = e.target.elements;
            
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
        });
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
            if(tripId === destination.tripId) {
                console.log(destination);
                const { clouds, temp } = destination.curentWeather;
                item.innerHTML = `
                    <div class="destination">   
                        <h3>${destination.city}</h3>
                        <button class="accordion">Button</button>
                        <div class="destination__info panel">
                            <img class="destination__image" src="${destination.imageURL}" />
                            <div class="current-weather">
                                <div class="current-weather__temp">${temp} ℃</div>
                            </div>
                        </div>
                    </div>
                `;
                destinationList.appendChild(item);
            }
        });
    }
}

export const accordions = () => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
    }
}