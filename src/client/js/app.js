export const tripForm = () => {
    let trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];    
    localStorage.setItem('trips', JSON.stringify(trips));
    const addTrip = document.getElementById('addTrip');

    addTrip.addEventListener('submit', (e) => {
        e.preventDefault();
        const tripTitle = document.getElementById('tripTitle').value;
        const startDate = 'start date';
        const endDate = 'end date';
        const tripData = {
            tripTitle,
            startDate,
            endDate
        }
        trips.push(tripData);
        localStorage.setItem('trips', JSON.stringify(trips));
        console.log(localStorage);
    });
};
 
export const destinationForm = () => {
    const addDestination = document.getElementById('addDestination');
    addDestination.addEventListener('submit', (e) => {
        e.preventDefault();
        let destination = {};
        const city = document.getElementById('city').value;
        const date = document.getElementById('date').value;
        const payload = {
            city
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
                date,
                ...response
            };
            console.log(destination);
        });
    });
};