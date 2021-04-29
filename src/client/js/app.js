import { v4 as uuidv4 } from 'uuid';

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
        const destinationForm = `
            <div><p>Trip Title: ${trip.tripTitle}</p></div>
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
        `;
        tripItem.innerHTML = destinationForm;
        tripList.appendChild(tripItem);
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
                console.log(localStorage);
            });
        });
    });

    
};