import { v4 as uuidv4 } from 'uuid';
import { showDestinations } from './showDestinations';

/**
 * Add a destination form to trip item and display relevant destination for each trip
 */
export const destinationForm = () => {
    // Check if destinations exist in local storage and assign them to destinations variable
    let destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations')) : [];    
    localStorage.setItem('destinations', JSON.stringify(destinations));

    // Add addEventListener to the body to listen for a click event on dynamially created element
    document.querySelector('body').addEventListener('click', e => {
        if(e.target.matches(".addDestination") || e.target.closest(".addDestination")) {
            e.preventDefault();
            const item = e.target;
            const form = e.target.parentElement.parentElement;

            if(item.classList.contains('pushDestination')) {
                let destination = {};
                const city = form.querySelector("[data-dest='city']");
                const tripId = form.querySelector("[data-dest='tripId']");
                const payload = {
                    city: city.value
                };
                
                // Fetch the destination based on user input
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

                    // Add the fetched destination to the local storage
                    destinations.push(destination);
                    localStorage.setItem('destinations', JSON.stringify(destinations));
                    
                    // Display destinations for this trip
                    showDestinations(destination.tripId);
                })
                .catch((error => console.log(error)));
            }
        }
    });
};