import { v4 as uuidv4 } from 'uuid';
import { showDestinations } from './showDestinations';

export const destinationForm = () => {
    let destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations')) : [];    
    localStorage.setItem('destinations', JSON.stringify(destinations));

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
                })
                .catch((error => console.log(error)));
            }
        }
    });
};