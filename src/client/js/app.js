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
        
    });
};

export const showTrips = () => {
    const trips = JSON.parse(localStorage.getItem('trips'));
    const tripList = document.getElementById('trip-list');

    trips.forEach(trip => {
        const tripItem = document.createElement('div');

        const destinationForm = `
            <div><p>Trip Title: ${trip.tripTitle}</p></div>
            <form id="${trip.id}" class="addDestination">
                <div class="field">
                    <input type="text" placeholder="Destination"/>
                </div>
                <div class="field__hidden">
                    <input type="text" value="${trip.id}">
                </div>
                <div>
                    <button type="submit">Add Destination</button>
                </div>
            </form>
        `;

        tripItem.innerHTML = destinationForm;
        tripList.appendChild(tripItem);

        // build item apperance in HTML

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
            console.log(e);

            // let destination = {};
            // const city = document.getElementById('city').value;
            // const date = document.getElementById('date').value;
            // const payload = {
            //     city
            // };


            // <form id="addDestination">
            //     <div class="field">
            //         <label for="city">City</label>
            //         <input id="city" type="text" placeholder="City">
            //     </div>
            //     <button type="submit">Submit</button>
            // </form>


            // fetch('http://localhost:8080/destination', {
            //     method: 'POST',
            //     credentials: 'same-origin',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // })
            // .then(response => response.json())
            // .then(response => {
            //     destination = {
            //         date,
            //         ...response
            //     };
            //     console.log(destination);
            // });
        });
    });

    
};